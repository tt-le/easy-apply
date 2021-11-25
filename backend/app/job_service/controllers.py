#TODO refactor into MVC

# Import flask dependencies
from operator import methodcaller
from flask import Blueprint, request, render_template, \
                  flash, g, session, redirect, url_for, jsonify, \
                  make_response
from flask.helpers import send_file
from flask_login import current_user, login_required

# Import the database object from the main app module
from app import db, require_role

# Import module models ()
from app.job_service.models import AppliedJob, Jobs
from app.auth.models import Applicant

import os

import codecs

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
    req = request.form 
    jobID = req.get("jobID")
    db.session.add(AppliedJob(jobID,current_user.get_id()))
    db.session.commit()

    filePathPDF = None
    try:
        if(request.files["resume"].filename != ""):
            filePathPDF = os.path.dirname(__file__)+ "../../../../applications/" + str(jobID) + "/" + str(current_user.get_id())
            if not os.path.exists(filePathPDF):
                os.makedirs(filePathPDF)
            filePathPDF = filePathPDF + "/resume.pdf"
            request.files["resume"].save(filePathPDF)
    except KeyError:
        print("No PDF Attached")

    filePathVid = None
    try:
        if(request.files["pitch"].filename != ""):
            filePathVid = os.path.dirname(__file__)+ "../../../../applications/" + str(jobID) + "/" + str(current_user.get_id())
            if not os.path.exists(filePathVid):
                os.makedirs(filePathVid)
            filePathVid = filePathVid + "/pitch.mp4"
            request.files["pitch"].save(filePathVid)
    except KeyError:
        print("No Video Attached")

    return "sucessful commit"

@job_service.route('/get', methods=['GET'])
@login_required
def get():
    print(current_user)
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
            "introduction": jobs.introduction,
            "jobID": jobs.id
        }
        print(job_dict)
        job_list["jobs"].append(job_dict)
    print(job_list)    
    return make_response(jsonify(job_list))

@job_service.route('/getJobs', methods=['GET'])
@login_required
@require_role('employer')
def getJobsWithId():
    userId = current_user.get_id()
    table = db.session.execute(f"SELECT * FROM jobs WHERE \"employerID\"={userId}")
    job_list = {'jobs':[]}
    for jobs in table:

        applied = db.session.execute(f"SELECT * FROM appliedJob WHERE \"jobID\"={jobs.id}")
        apps = []

        for application in applied:
            app_user =  db.session.execute(f"SELECT \"firstName\", \"lastName\" FROM applicant WHERE \"user_id\"={application.userID}")

            for user in app_user:
                app_dict = {
                    "userId": application.userID,
                    "Name": user.firstName + " " + user.lastName,
                    "custom": os.path.exists(os.path.dirname(__file__)+ "../../../../applications/" + str(jobs.id) + "/" + str(application.userID) + "/pitch.mp4"),
                    "profile": os.path.exists(os.path.dirname(__file__)+ "../../../../pitch/" + str(application.userID) + "/pitch.mp4")
                }

            apps.append(app_dict)
        
        applicants_list = []
        i = 0
        applied = db.session.execute(f"SELECT * FROM appliedJob WHERE \"jobID\"={jobs.id}")
        for applicants in applied:
            userID = applicants.userID

            if os.path.exists(os.path.dirname(__file__)+ "../../../../applications/" + str(jobs.id) + "/" + str(userID) + "/pitch.mp4"):
                app_user =  db.session.execute(f"SELECT \"firstName\", \"lastName\" FROM applicant WHERE \"user_id\"={userID}")

                for user in app_user:
                    applicant_dict = {
                        "userID": userID,
                        "Name": user.firstName + " " + user.lastName
                    }

                if(i < 10):
                    applicants_list.append(applicant_dict)
                    i=i+1
                else:
                    break

        job_dict = {
            "jobName": jobs.jobName,
            "employerID": jobs.employerID,
            "companyName": jobs.companyName,
            "email": jobs.email,
            "industry": jobs.industry,
            "location": jobs.location,
            "introduction": jobs.introduction,
            "jobID": jobs.id,
            "applicants": apps,
            "topApplicants": applicants_list
        }
        print(job_dict)
        job_list["jobs"].append(job_dict)
    print(job_list)    
    return make_response(jsonify(job_list))

@job_service.route('/search', methods=['POST'])
@login_required
@require_role('employer')
def searchApplicants():
    req = request.json
    jobID = req.get("jobID")
    table = db.session.execute("SELECT * FROM appliedjob")
    applicants_list = {'applicants':[]}
    i = 0
    for applicants in table:
        userID = applicants.userID
        if jobID == applicants.jobID:
            applicant_dict = {
                "userID": userID,
            }
            print(applicant_dict)
            applicants_list["applicants"].append(applicant_dict)
    return make_response(jsonify(applicants_list))

@job_service.route('/searchtop10', methods=['POST'])
@login_required
@require_role('employer')
def searchtop10():
    req = request.json
    jobID = req.get("jobID")
    table = db.session.execute(f"SELECT * FROM appliedjob WHERE \"jobID\"={jobID}")
    applicants_list = {'topApplicants':[]}
    i = 0
    for applicants in table:
        userID = applicants.userID
        if os.path.exists(os.path.dirname(__file__)+ "../../../../applications/" + str(jobID) + "/" + str(userID) + "/pitch.mp4"):
            app_user =  db.session.execute(f"SELECT \"firstName\", \"lastName\" FROM applicant WHERE \"user_id\"={userID}")

            for user in app_user:
                applicant_dict = {
                    "userID": userID,
                    "Name": user.firstName + " " + user.lastName
                }

            print(applicant_dict)
            if(i < 10):
                applicants_list["topApplicants"].append(applicant_dict)
                i=i+1
            else:
                break
            
    return make_response(jsonify(applicants_list))

@job_service.route('/searchwithpitch', methods =['POST'])
@login_required
@require_role('employer')
def searchwithpitch():
    req = request.json
    jobID = req.get("jobID")
    table = db.session.execute("SELECT * FROM appliedjob")
    applicants_list = {'applicants':[]}
    for applicants in table:
        userID = applicants.userID
        if jobID == applicants.jobID and (os.path.exists(os.path.dirname(__file__)+ "../../../../applications/" + str(jobID) + "/" + str(userID) + "/pitch.mp4") or os.path.exists(os.path.dirname(__file__)+ "../../../../pitch/" + str(userID) + "/pitch.mp4")):
            applicant_dict = {
                "userID": userID,
                "custom": os.path.exists(os.path.dirname(__file__)+ "../../../../applications/" + str(jobID) + "/" + str(userID) + "/pitch.mp4"),
                "profile": os.path.exists(os.path.dirname(__file__)+ "../../../../pitch/" + str(userID) + "/pitch.mp4")
            }
            applicants_list["applicants"].append(applicant_dict)
    return make_response(jsonify(applicants_list))

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

@job_service.route('/getfile', methods=['PUT'])
@login_required
@require_role('employer')
def getFile():
    req = request.json
    print(req)
    text = req.get("type")
    userId = req.get("userId")
    jobId = req.get("jobId")

    print(text)

    if(text == "resume"):
        filePath = os.path.dirname(__file__)+ "../../../../applications/" + str(jobId) + "/" + str(userId) + "/resume.pdf"
        print(filePath)
        if not os.path.exists(filePath):
            return "Resume doesn't exist", 403
        else:
            return send_file(filePath, mimetype='application.pdf')
    elif(text == "pitch" and jobId != None):
        filePath = os.path.dirname(__file__)+ "../../../../applications/" + str(jobId) + "/" + str(userId) + "/pitch.mp4"
        if not os.path.exists(filePath):
            return "Pitch doesn't exist", 403
        else:
            return send_file(filePath, mimetype="video/mp4")
    elif(text == "pitch"):
        filePath = os.path.dirname(__file__)+ "../../../../pitch/" + str(userId) + "/pitch.mp4"
        if not os.path.exists(filePath):
            return "Pitch doesn't exist", 403
        else:
            return send_file(filePath, mimetype="video/mp4")
    else:
        return "invalide file requested", 403


@job_service.route('/job-applicants', methods=['GET'])
@login_required
@require_role('employer')
def job_applicants():
    user_id = current_user.get_id()
    # user_id = 1
    job_applicants = db.session.execute("""
        SELECT appliedJob."jobID", jobs."jobName", jobs."employerID", applicant.user_id, applicant."firstName", 
        applicant."lastName", applicant."profilePath", applicant."vidPath"
        FROM appliedJob, jobs, applicant 
        WHERE appliedJob."jobID" = Jobs.id AND appliedJob."userID" = applicant.user_id"""+
        f" AND Jobs.\"employerID\" = {user_id} ORDER BY appliedJob.\"jobID\";")
    resp = []
    for applicant in job_applicants:
        print(applicant.jobName)
        resp.append(
            {
                "jobID": applicant.jobID,
                "jobName": applicant.jobName,
                "userID":applicant.user_id ,
                "firstName":applicant.firstName ,
                "lastName":applicant.lastName ,
                "profilePath":applicant.profilePath ,
                "vidPath":applicant.vidPath,
            }
        )
    # print(resp)
    return make_response(jsonify(resp))

@job_service.route('/checkEmployer', methods=['GET'])
@login_required
@require_role('employer')
def check_emp():
    return make_response("success", 200)

@job_service.route('/checkApplicant', methods=['GET'])
@login_required
@require_role('applicant')
def check_app():
    return make_response("success", 200)

@job_service.route('/checkLogin', methods=['GET'])
@login_required
def check_log():
    return make_response("success", 200)

@job_service.route('/getApplied', methods=['GET'])
@login_required
@require_role('applicant')
def get_applied():
    print(current_user.get_id())
    table = db.session.execute(f"SELECT * FROM appliedJob WHERE \"userID\"={current_user.get_id()}")
    job_list = {'jobs':[]}

    for job in table:
        table2 = db.session.execute(f"SELECT * FROM jobs WHERE \"id\"={job.jobID}")

        for jobs in table2:
            job_dict = {
                "jobName": jobs.jobName,
                "employerID": jobs.employerID,
                "companyName": jobs.companyName,
                "email": jobs.email,
                "industry": jobs.industry,
                "location": jobs.location,
                "introduction": jobs.introduction
            }
        
        job_list["jobs"].append(job_dict)
    
    return make_response(jsonify(job_list))