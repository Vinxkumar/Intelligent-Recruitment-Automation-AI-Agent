from flask import Flask, render_template, request 
from flask import redirect
from src.FrontEnd.data_mediator import verify_user, get_drive_details, get_drive_list
import datetime


import os
app = Flask(__name__, template_folder=os.path.join(os.path.dirname(__file__), "templates"))

# app = Flask("__name__", template_folder="templates", static_folder="static")

@app.route('/', methods=['GET'])
def main():
    return render_template("loginPage.html")
    # return render_template("index.html")


@app.route('/home', methods=['GET'])
def home():
    return render_template("index.html")
    # return render_template("details.html")



@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    if verify_user(username, password):
        return redirect('/home')
    else:
        return """
            <script>
                alert("Invalid credentials. Please try again.");
                window.location.href = "/";
            </script>
        """


@app.route('/getDriveDetails', methods=['GET'])
def getWIndow():
    return render_template("details.html")
@app.route('/getdata', methods=['POST'])
def datahandler():
    rolename = request.form['drive_name']
    mSkills = request.form['mustSkills']
    nSkills = request.form['niceSkills']
    loc = request.form['location']
    exprange = request.form['experienceRange']
    emptype = request.form['emptype']
    ctc = request.form['CTC']

    data = {
        "role_name": rolename,
        "must_to_have_skills": mSkills,
        "nice_to_have_skills": nSkills,
        "experience_range": exprange,
        "ctc": ctc,
        "emp_type": emptype,
        "location": loc
    }
    # return redirect('/')
    if get_drive_details(data):
        return """
            <script>
                alert("Drive posted successfully!");
                window.location.href = "/home";
            </script>
"""
    else:        
        return """
            <script>
                alert("Failed to post the drive. Please try again.");
                window.location.href = "/getDriveDetails";
            </script>
"""


@app.route('/giveDriveDetails', methods=['GET'])
def giveDriveDetails():
    return get_drive_list()

def start_frontend():
    app.run(debug=True)    
    
    
