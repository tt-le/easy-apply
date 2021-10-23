import datetime
# Import flask dependencies
from flask import Blueprint, request, render_template, \
                  flash, g, session, redirect, url_for, jsonify, \
                  make_response

from flask_login import  login_user, logout_user, current_user, login_required

# Import the database object from the main app module and bcrypt
from app import db, bcrypt, login_manager, app, require_role
# Import module models 
from app.auth.models import Role, Applicant, Employer, Authentication


# Define the blueprint: 'auth', set its url prefix: app.url/auth
auth_service = Blueprint('auth', __name__, url_prefix='/auth')


# Roles
applicant_role = Role(name="applicant")
employer_role =  Role(name="employer")
db.session.commit()

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
        auth = Authentication(email=email, email_confirmed_at=datetime.datetime.utcnow(), password=pw)
        db.session.add(auth)
        db.session.flush()

        if role == "applicant":
            auth.roles = [applicant_role]
            birthDate = req.get("birthDate")
            gender = req.get("gender")
            applicant = Applicant(user_id=auth.id, firstName=firstName, lastName=lastName,
                address=address, city=city, country=country, gender=gender, birthDate=birthDate)
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
    