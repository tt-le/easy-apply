
from flask import Flask, render_template, make_response
from flask_cors import CORS
# DB imports
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager, current_user
from functools import wraps

from flask_bcrypt import Bcrypt
# Define the WSGI application object
app = Flask(__name__)
CORS(app)

# Configurations
app.config.from_object('config.DevelopmentConfig')
app.secret_key = '9b5d6d7fc07866d6f364dd509477ceb520322f7ceaa2587eb87df37a1a97c9a7'


# Define the database object which is imported
# by modules and controllers
db = SQLAlchemy(app)
migrate = Migrate(app, db)


bcrypt = Bcrypt(app)


# flask-login
login_manager = LoginManager()
login_manager.init_app(app)

def require_role(role):
    """make sure user has this role"""
    def decorator(func):
        @wraps(func)
        def wrapped_function(*args, **kwargs):
            if not current_user.has_role(role):
                return make_response("Unauthorized role", 401)
            else:
                return func(*args, **kwargs)
        return wrapped_function
    return decorator



# Sample HTTP error handling
@app.errorhandler(404)
def not_found(error):
    return render_template('404.html'), 404

@app.after_request
def apply_CORS(response):
    response.headers["Access-Control-Allow-Origin"] = "http://localhost:3000"
    response.headers["Access-Control-Allow-Headers"] =  "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
    return response

# Import a module / component using its blueprint handler variable (mod_auth)
from app.job_service.controllers import job_service
from app.auth.controllers import auth_service

# Register blueprint(s)
app.register_blueprint(job_service)
app.register_blueprint(auth_service)
# app.register_blueprint(xyz_module)
# ..

# Build the database:
# This will create the database file using SQLAlchemy
db.create_all()