
# Import flask dependencies
from flask import Blueprint, request, render_template, \
                  flash, g, session, redirect, url_for, jsonify, \
                  make_response

from flask_login import login_user, logout_user, login_required, current_user


# Import the database object from the main app module and bcrypt
from app import db, bcrypt, login_manager

# Import module models 
from app.auth.models import Role, Applicant, Employer, Authentication


# Define the blueprint: 'auth', set its url prefix: app.url/auth
auth_service = Blueprint('auth', __name__, url_prefix='/auth')

@login_manager.user_loader
def load_user(user_id):
    return Authentication.query.filter_by(id=int(user_id)).first()

# Test method
@auth_service.route('/get', methods=['GET'])
@login_required
def get():
    print(current_user)
    users = Applicant.query.all()
    res = {'users':[]}
    for user in users:
        print(user)
        res['users'].append(str(user))

    return make_response(jsonify(res))


@auth_service.route('/signup', methods=['POST'])
def signup():
    req = request.json
    firstName = req.get("firstName")
    lastName = req.get("lastName")
    email = req.get("email")
    pw = bcrypt.generate_password_hash(req.get("password")).decode('utf8')
    role = req.get("role")
    address = req.get("address")
    city = req.get("city")
    country = req.get("country")

    query = Authentication.query.filter_by(email=email).first()
    if query is None:
        
        if role == "applicant":
            birthDate = req.get("birthDate")
            gender = req.get("gender")
            role = Role(role="applicant", status=1)
            db.session.add(role)
            db.session.flush()
            applicant = Applicant(user_id=role.user_id, firstName=firstName, lastName=lastName,
                address=address, city=city, country=country, gender=gender, birthDate=birthDate)
            db.session.add(applicant)
        else:
            org = req.get("organization")
            role = Role(role="employer", status=1)
            db.session.add(role)
            db.session.flush()
            employer = Employer(user_id=role.user_id, firstName=firstName, lastName=lastName,
                address=address, city=city, country=country, organization=org)
            db.session.add(employer)
            
        auth = Authentication(user_id=role.user_id, email=email, password=pw)
        db.session.add(auth)
        db.session.commit()
        message = f"Successfully create a new user" + str(role)

        print(message)
        return make_response(message,201)
    else:
        return make_response("User already exists",418)
    

@auth_service.route('/login', methods=['POST'])
def login():
    req = request.json
    email = req.get("email")
    pw = req.get("password")
    user = Authentication.query.filter_by(email=email).first()
    if user and bcrypt.check_password_hash(user.password, pw):
        login_user(user, remember=True)
        return make_response("Successfully logged in", 201)
    else:
        return make_response("Incorrect password/email combination", 418)


@auth_service.route('/logout')
def logout():
    logout_user()
    return make_response("Successfully logged out", 201)
    