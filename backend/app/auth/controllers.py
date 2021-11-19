import datetime, os
# Import flask dependencies
from flask import Blueprint, request, render_template, \
                  flash, g, session, redirect, url_for, jsonify, \
                  make_response, url_for

from flask_mail import Message

from itsdangerous import URLSafeTimedSerializer, SignatureExpired


from flask_login import  login_user, logout_user, current_user, login_required

# Import the database object from the main app module and bcrypt
from app import db, bcrypt, login_manager, app, require_role, mail, app
# Import module models 
from app.auth.models import Role, Applicant, Employer, Authentication

# Define the blueprint: 'auth', set its url prefix: app.url/auth
auth_service = Blueprint('auth', __name__, url_prefix='/auth')

url_serializer = URLSafeTimedSerializer(app.config['SECRET_KEY'])


@login_manager.user_loader
def load_user(user_id):
    return Authentication.query.filter_by(id=int(user_id)).first()


# Test method
@auth_service.route('/get', methods=['GET'])
@login_required
@require_role('applicant')
def get():
    print(current_user)
    users = Applicant.query.all()
    res = {'users':[]}
    for user in users:
        print(user)
        res['users'].append(str(user))

    return make_response(jsonify(res))


@auth_service.route('/confirm-email/<token>')
def confirm_email(token):
    try:
        email = url_serializer.loads(token, salt='email-confirmation', max_age=600)
        user = Authentication.query.filter_by(email=email).first()
        user.email_confirmed_at = datetime.datetime.utcnow()
        db.session.commit()
        db.session.close()
    except SignatureExpired:
        return make_response('Signature expired', 401)
    return make_response('Email confirmed', 200)

@auth_service.route('/signup', methods=['POST'])
def signup():
    req = request.form
    firstName = req.get("firstName")
    lastName = req.get("lastName")
    email = req.get("email")
    pw = bcrypt.generate_password_hash(req.get("password")).decode('utf8')
    role = req.get("role")
    address = req.get("address")
    city = req.get("city")
    country = req.get("country")

    # Roles
    applicant_role = Role.query.filter_by(name="applicant").first()
    employer_role =  Role.query.filter_by(name="employer").first()
    if not applicant_role:
        applicant_role = Role(name="applicant")
        db.session.add(applicant_role)
        db.session.commit()
    if not employer_role:
        employer_role =  Role(name="employer")
        db.session.add(employer_role)
        db.session.commit()

    query = Authentication.query.filter_by(email=email).first()
    if query is None:
        auth = Authentication(email=email, email_confirmed_at=None, password=pw)
        db.session.add(auth)
        db.session.flush()

        if role.lower() == "applicant":
            auth.roles = [applicant_role]
            birthDate = req.get("birthDate")
            gender = req.get("gender")
            
            filePathVid = None
            try:
                if(request.files["video"].filename != ""):
                    filePathVid = os.path.dirname(__file__)+ "../../../../pitch/" + str(current_user.get_id())
                    os.makedirs(filePathVid)
                    filePathVid = filePathVid + "/" + "pitch.mp4"
                    request.files["video"].save(filePathVid)
            except KeyError:
                print("No Video Attached")

            filePathPhoto = None
            try:
                if(request.files["photo"].filename != ""):
                    filePathPhoto = os.path.dirname(__file__)+ "../../../../profile/" + str(current_user.get_id())
                    os.makedirs(filePathPhoto)
                    filePathPhoto = filePathPhoto + "/resume" + request.files["photo"].filename.split(".")[1]
                    request.files["photo"].save(filePathPhoto)
            except KeyError:
                print("No Photo Attached")
            
            applicant = Applicant(user_id=auth.id, firstName=firstName, lastName=lastName,
                address=address, city=city, country=country, gender=gender, birthDate=birthDate, profilePath=filePathPhoto, vidPath=filePathVid)
            db.session.add(applicant)
            db.session.flush()
        else:
            auth.roles = [employer_role]
            org = req.get("organization")
            employer = Employer(user_id=auth.id, firstName=firstName, lastName=lastName,
                address=address, city=city, country=country, company_name=org)
            db.session.add(employer)
            db.session.flush()
        
        db.session.commit()
        db.session.close()
        message = f"Successfully create a new user" + str(role)

        token = url_serializer.dumps(email, salt='email-confirmation')
        msg = Message('Confirm email', sender='easyapplyc01@gmail.com', recipients=[email])
        link = 'http://localhost:3000/confirmemail/--'+url_for('auth.confirm_email', token=token, _external=True)
        msg.body = 'Verify using this link {}'.format(link)
        mail.send(msg)

        print(message)
        return make_response(message,201)
    # elif: if user email not verified...
    else:
        return make_response("User already exists",418)

@auth_service.route('/verify-email')
@login_required
def verify_email():
    try:
        email = request.json.get('email')
    except:
        return make_response('Email not in json', 400)
    token = url_serializer.dumps(email, salt='email-confirmation')
    msg = Message('Confirm email', sender='easyapplyc01@gmail.com', recipients=[email])
    link = 'http://localhost:3000/confirmemail/--'+url_for('auth.confirm_email', token=token, _external=True)
    msg.body = 'Verify using this link {}'.format(link)
    try:
        mail.send(msg)
        return make_response('Email was sent', 200)
    except:
        return make_response('Email wasn\'t sent', 500)


@auth_service.route('/forgot_password', methods=['POST'])
def forgot_password():
    try:
        email = request.json.get('email')
    except:
        return make_response('Email missing from rerquest json', 400)

    token = url_serializer.dumps(email, salt='forgot-password')
    msg = Message('Forgot password', sender='easyapplyc01@gmail.com', recipients=[email])
    link = f"http:localhost:3000/reset-password/{token}" #url_for('auth.change_password', token=token, _external=True)
    msg.body = 'Change password using this link {}'.format(link)
    mail.send(msg)

    return make_response('Email sent', 200)
    

@auth_service.route('/change_password/<token>', methods=['POST'])
def change_password(token):
    try:
        req = request.json
        password = bcrypt.generate_password_hash(req.get("password")).decode('utf8')
    except:
        return make_response('Password missing from request json', 400)
    try:
        email = url_serializer.loads(token, salt='forgot-password', max_age=600)
        user = Authentication.query.filter_by(email=email).first()
        user.password = password
        db.session.commit()
        db.session.close()
    except SignatureExpired:
        return make_response('Signature expired', 401)
    return make_response('Password changed', 200)


@auth_service.route('/login', methods=['POST'])
def login():
    req = request.json
    email = req.get("email")
    pw = req.get("password")
    user = Authentication.query.filter_by(email=email).first()

    if user and user.email_confirmed_at == None:
        return make_response("Email not verified", 403)

    if user and bcrypt.check_password_hash(user.password, pw):
        login_user(user, remember=True)
        return make_response("Successfully logged in", 201)
    else:
        return make_response("Incorrect password/email combination", 401)


@auth_service.route('/logout')
def logout():
    logout_user()
    return make_response("Successfully logged out", 201)
    
@auth_service.route("/profile", methods=['GET'])
@login_required
def get_profile():
    data = None
    if current_user.has_role('applicant'):
        data = Applicant.query.filter_by(user_id=current_user.get_id()).first()
    else:
        data = Employer.query.filter_by(user_id=current_user.get_id()).first()
    return make_response(jsonify(data), 201)

@auth_service.route("/profile", methods=['PUT'])
def edit_profile():
    req = request.json
    if current_user.has_role('applicant'):
        data = Applicant.query.filter_by(user_id=current_user.get_id()).first()
    else:
        data = Employer.query.filter_by(user_id=current_user.get_id()).first()
        
    if(data.count() > 0):
        name = request.get("name")
        age = request.get("age")
        # introduction = request.get("introduction")
        data.name = name
        data.age = age
        # data.introduction = introduction
        db.session.commit()
    else:
        company_name = request.get("company name")
        manager_first_name = request.get("manager first name")
        manager_last_name = request.get("manager last name")
        data.company_name = company_name
        data.firstName = manager_first_name
        data.lastName = manager_last_name
        db.session.commit()
    db.session.close()
    return make_response("Successful edit", 201)

@auth_service.route("/dashboard", methods=['GET'])
def get_profile():
    if current_user.has_role('applicant'):
        data = Applicant.query.filter_by(user_id=current_user.get_id()).first()
    else:
        data = Employer.query.filter_by(user_id=current_user.get_id()).first()
    return make_response(jsonify(data), 201)