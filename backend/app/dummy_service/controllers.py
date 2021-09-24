#TODO refactor into MVC

# Import flask dependencies
from flask import Blueprint, request, render_template, \
                  flash, g, session, redirect, url_for, jsonify, \
                  make_response

# Import the database object from the main app module
from app import db

# Import module models (i.e. Dummy)
from app.dummy_service.models import Dummy

# Define the blueprint: 'auth', set its url prefix: app.url/auth
dummy_service = Blueprint('dummy', __name__, url_prefix='/dummy')

# Set the route and accepted methods
@dummy_service.route('/create/<name>', methods=['GET','POST'])
def create(name):
    db.session.add(Dummy(name))
    db.session.commit()
    message = f"<div> Added a dummy named {name}! </div>"
    print(message)
    return make_response(message)

@dummy_service.route('/get', methods=['GET'])
def get():
    table = db.session.execute("SELECT * FROM dummy")
    message = "List of dummies"
    res = {'table':[]}
    for dummy in table:
        message += f"<div> Dummy: {dummy.name}! </div>"
        res['table'].append(dummy.name) 
    print(message)
    return make_response(jsonify(res))