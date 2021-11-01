#TODO refactor into MVC

# Import flask dependencies
from operator import methodcaller
from flask import Blueprint, request, render_template, \
                  flash, g, session, redirect, url_for, jsonify, \
                  make_response
from flask_login import current_user, login_required

# Import the database object from the main app module
from app import db, require_role

# Import module models ()
from app.job_service.models import AppliedJob, Jobs

# Define the blueprint: 'auth', set its url prefix: app.url/auth
job_service = Blueprint('jobs', __name__, url_prefix='/jobs')

# Set the route and accepted methods
@job_service.route('/create', methods=['POST'])
@login_required
@require_role('employer')
def create():
    req = request.json
    jobName = req.get("jobName")
    companyName = req.get("companyName")
    email = req.get("email")
    industry = req.get("industry")
    location = req.get("location")
    introduction = req.get("introduction")
    db.session.add(Jobs(jobName,current_user.get_id(),companyName,email,industry,location,introduction))
    db.session.commit()
    message = f"<div> Added a job named {jobName}! </div>"
    print(message)
    return make_response(message)

@job_service.route('/applyjob', methods=['PUT'])
@login_required
@require_role('applicant')
def applyjob():
    req = request.json 
    jobID = req.get("jobID")
    db.session.add(AppliedJob(jobID,current_user.get_id()))
    db.session.commit()
    return "sucessful commit"

@job_service.route('/get', methods=['GET'])
def get():
    table = db.session.execute("SELECT * FROM jobs")
    job_list = {'jobs':[]}
    for jobs in table:
        job_dict = {
            "jobName": jobs.jobName,
            "employerID": jobs.employerID,
            "companyName": jobs.companyName,
            "email": jobs.email,
            "industry": jobs.industry,
            "location": jobs.location,
            "introduction": jobs.introduction
        }
        print(job_dict)
        job_list["jobs"].append(job_dict)
    print(job_list)    
    return make_response(jsonify(job_list))
        
@job_service.route('/search/<userInput>', methods=['GET'])
def displayJob(userInput):
    #if any stuff contains search input, then 1 else 0 for score. Then display all jobs with score of 1 
    # first iterate through loop to find score, then make list to have score stored, index represents jobID, then if list index has 1
    # get info from database and send that to the frontend
    table = db.session.execute("SELECT * FROM jobs")
    job_list = {'jobs':[]}
    for jobs in table:
        if (userInput in jobs.jobName) or (userInput in jobs.companyName) or (userInput in jobs.industry):
            job_dict = {
                "jobName": jobs.jobName,
                "employerID": jobs.employerID,
                "companyName": jobs.companyName,
                "email": jobs.email,
                "industry": jobs.industry,
                "location": jobs.location,
                "introduction": jobs.introduction
            }
            print(job_dict)
            job_list["jobs"].append(job_dict)
    print(job_list)    
    return make_response(jsonify(job_list))
