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

@job_service.route('/search', methods=['GET','POST'])
def displayJob():
    #if any stuff contains search input, then 1 else 0 for score. Then display all jobs with score of 1 
    # first iterate through loop to find score, then make list to have score stored, index represents jobID, then if list index has 1
    # get info from database and send that to the frontend
    userInput = "software"
    table = db.session.execute("SELECT * FROM jobs")
    job_list = {'jobs':[]}
    for jobs in table:
        exist = False
        if jobs.jobName.contains(userInput) or jobs.companyName.contains(userInput) or jobs.industry.contains(userInput):
            exist = True
        if exist:
            job_list.append(jobs.jobName)
    return make_response(jsonify(job_list))