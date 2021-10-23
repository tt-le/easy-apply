#TODO refactor into MVC

# Import flask dependencies
from operator import methodcaller
from flask import Blueprint, request, render_template, \
                  flash, g, session, redirect, url_for, jsonify, \
                  make_response

# Import the database object from the main app module
from app import db

# Import module models (i.e. Dummy)
from app.job_service.models import AppliedJob, Jobs

# Define the blueprint: 'auth', set its url prefix: app.url/auth
job_service = Blueprint('jobs', __name__, url_prefix='/jobs')

# Set the route and accepted methods
@job_service.route('/create/<jobName>/<employerID>/<companyName>/<email>/<industry>/<location>/<introduction>', methods=['PUT'])
def create(jobName,employerID,companyName,email,industry,location,introduction):
    #request_method = request.method
    #jobID = request.form["jobID"]
    #jobName = request.form["jobName"]
    #employerID = request.form["employerId"]
    #companyName = request.form["companyName"]
    #email = request.form["email"]
    #industry = request.form["industry"]
    #location = request.form["location"]
    #introduction = request.form["introduction"]
    db.session.add(Jobs(jobName,employerID,companyName,email,industry,location,introduction))
    db.session.commit()
    message = f"<div> Added a job named {jobName}! </div>"
    print(message)
    return make_response(message)

@job_service.route('/applyjob/<jobID>', methods=['PUT'])
#@login_required
#@roles_required('applicant')
def applyjob(jobID):
    #request_method = request.method
    #jobID = request.form["jobID"]
    #jobName = request.form["jobName"]
    #employerID = request.form["employerId"]
    #companyName = request.form["companyName"]
    #email = request.form["email"]
    #industry = request.form["industry"]
    #location = request.form["location"]
    #introduction = request.form["introduction"]
    print(current_user.get_id)
    db.session.add(AppliedJob(jobID,current_user.get_id))
    db.session.commit()
    message = f"<div> Applyed to job with jobID:{jobID} and userID: {current_user.get_id} </div>"
    print(message)
    return make_response(message)

@job_service.route('/get', methods=['GET'])
def get():
    table = db.session.execute("SELECT * FROM jobs")
    job_list = {'jobs':[]}
    for jobs in table:
        #job_list["jobs"].append(jobs)
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
            #job_list["jobs"].append(jobs)
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
