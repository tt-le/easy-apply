#TODO refactor into MVC

# Import flask dependencies
from flask import Blueprint, request, render_template, \
                  flash, g, session, redirect, url_for, jsonify, \
                  make_response

# Import the database object from the main app module
from app import db

# Import module models (i.e. Dummy)
from app.job_service.models import Jobs

# Define the blueprint: 'auth', set its url prefix: app.url/auth
job_service = Blueprint('jobs', __name__, url_prefix='/jobs')

# Set the route and accepted methods
@job_service.route('/create/<jobID>/<jobName>/<employerID>/<companyName>/<email>/<industry>/<location>/<introduction>', methods=['GET','POST'])
def create(jobID,jobName,employerID,companyName,email,industry,location,introduction):
    db.session.add(Jobs(jobID))
    db.session.add(Jobs(jobName))
    db.session.add(Jobs(employerID))
    db.session.add(Jobs(companyName))
    db.session.add(Jobs(email))
    db.session.add(Jobs(industry))
    db.session.add(Jobs(location))
    db.session.add(Jobs(introduction))
    db.session.commit()
    message = f"<div> Added a job named {jobName}! </div>"
    print(message)
    return make_response(message)

@job_service.route('/get', methods=['GET'])
def get():
    table = db.session.execute("SELECT * FROM jobs")
    message = "List of jobs"
    res = {'table':[]}
    for job in table:
        message += f"<div> Job: {job.jobName}! </div>"
        res['table'].append(job.Jobname) 
    print(message)
    return make_response(jsonify(res))