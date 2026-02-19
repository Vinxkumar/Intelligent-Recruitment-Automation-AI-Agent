from flask import Flask, render_template, request 
from flask import redirect
import datetime

app = Flask("__name__")

# global LOG
# LOG = "Hello"

@app.route('/', methods=['GET'])
def main():
    return render_template("loginPage.html")




@app.route('/home', methods=['GET'])
def home():
    return render_template("index.html")



@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    if username == "admin" and password == "admin":
        return redirect('/home')
    else:
        return """
        <script>
            alert("Invalid username or password. Please try again.");
            window.history.back(); // Goes back to the login page
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
    print(data)

    return redirect('/')

@app.route('/log')
def updatelog(msg = "log console "):
    return msg + str(datetime.datetime.now())

# def runHTML():
   

if __name__ == "__main__":
    app.run(debug=True)
    
    
