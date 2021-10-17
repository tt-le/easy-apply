#TODO refactor into MVC

# Import flask dependencies
from operator import methodcaller
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
@job_service.route('/create/<jobID>/<jobName>/<employerId>/<companyName>/<email>/<industry>/<location>/<introduction>', methods=['PUT'])
def create(jobID,jobName,employerID,companyName,email,industry,location,introduction):
    #request_method = request.method
    #jobID = request.form["jobID"]
    #jobName = request.form["jobName"]
    #employerID = request.form["employerId"]
    #companyName = request.form["companyName"]
    #email = request.form["email"]
    #industry = request.form["industry"]
    #location = request.form["location"]
    #introduction = request.form["introduction"]
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
        message += f"<div> ID: {job.jobID} Job: {job.jobName}! </div>"
        res['table'].append(job.Jobname) 
    print(message)
    return make_response(jsonify(res))
        
@job_service.route('/search/<userInput>', methods=['GET','POST'])
def displayJob(userInput):
    #if any stuff contains search input, then 1 else 0 for score. Then display all jobs with score of 1 
    # first iterate through loop to find score, then make list to have score stored, index represents jobID, then if list index has 1
    # get info from database and send that to the frontend
    table = db.session.execute("SELECT * FROM jobs")
    job_list = {'jobs':[]}
    for jobs in table:
        exist = False
        if jobs.jobName.contains(userInput) or jobs.companyName.contains(userInput) or jobs.industry.contains(userInput):
            exist = True
        if exist:
            job_list.append(jobs.jobName)
    return make_response(jsonify(job_list))
