# Import flask dependencies
from flask import Blueprint, request, render_template, \
                  flash, g, session, redirect, url_for

# Import the database object from the main app module
from app import db

# Import module models (i.e. Dummy)
from app.dummy_service.models import Dummy

# Define the blueprint: 'auth', set its url prefix: app.url/auth
dummy_service = Blueprint('dummy', __name__, url_prefix='/dummy')

# Set the route and accepted methods
@dummy_service.route('/endpoint/', methods=['GET', 'POST'])
def create():
    Dummy.create
    return render_template("auth/signin.html", form=form)