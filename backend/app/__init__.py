from flask import Flask
from flask_cors import CORS
# DB imports
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate


# Define the WSGI application object
app = Flask(__name__)
CORS(app)

# Configurations
app.config.from_object('config.DevelopmentConfig')

# Define the database object which is imported
# by modules and controllers
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Sample HTTP error handling
@app.errorhandler(404)
def not_found(error):
    return render_template('404.html'), 404

# Import a module / component using its blueprint handler variable (mod_auth)
from app.dummy_service.controllers import dummy_service 

# Register blueprint(s)
app.register_blueprint(dummy_service)
# app.register_blueprint(xyz_module)
# ..

# Build the database:
# This will create the database file using SQLAlchemy
db.create_all()