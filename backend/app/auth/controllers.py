
# Import flask dependencies
from flask import Blueprint, request, render_template, \
                  flash, g, session, redirect, url_for, jsonify, \
                  make_response

# Import the database object from the main app module and bcrypt
from app import db, bcrypt

# Import module models 
from app.auth.models import User#, Applicant, Employer

# Define the blueprint: 'auth', set its url prefix: app.url/auth
auth_service = Blueprint('auth', __name__, url_prefix='/auth')


# Test method
@auth_service.route('/get', methods=['GET'])
def get():
    
    users = User.query.all()
    res = {'users':[]}
    for user in users:
        print(user)
        res['users'].append(str(user))

    return make_response(jsonify(res))


@auth_service.route('/signup', methods=['POST'])
def signup():
    secondary_role = None
    req = request.form
    firstName = req.get("firstName")
    lastName = req.get("lastName")
    email = req.get("email")
    pw = bcrypt.generate_password_hash(req.get("password")).decode('utf8')
    role = req.get("role")
    address = req.get("address")
    city = req.get("city")
    country = req.get("country")
    user = User(firstName=firstName, lastName=lastName,
     email=email, password=pw, address=address, city=city, 
     country=country, role=role, status=1)
    # if True or role == "applicant":
    #     birthDate = req.get("birthDate")
    #     gender = req.get("gender")
    #     secondary_role = Applicant(email, birthDate, gender, user)
    # else:
    #     org = req.get("organization")
    #     secondary_role = Employer(email, org, user)
    
    query = User.query.filter_by(email=email).first()
    if query is None:
        # user = User(firstName=firstName, lastName=lastName,
        # email=email, password=pw, address=address, city="city", 
        # country=country, role=role, status=1)
        db.session.add(user)
        # db.session.add(secondary_role)
        db.session.commit()
        message = f"Successfully create a new user"
        print(message)
        return make_response(message,201)
    else:
        return make_response("User already exists",418)
    

@auth_service.route('/login', methods=['POST'])
def login():
    req = request.form
    email = req.get("email")
    pw = req.get("password")
    query = User.query.filter_by(email=email).first()
    if query and bcrypt.check_password_hash(query.password, pw):
        return make_response("Successfully logged in", 201)
    else:
        return make_response("Incorrect password/email combination", 418)