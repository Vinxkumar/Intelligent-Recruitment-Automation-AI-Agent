from fileinput import filename
import os
from flask import Flask, render_template, request
from werkzeug.utils import secure_filename


app = Flask(__name__)

@app.route('/', methods = ['GET'])
def index():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def handler():
    role = request.form['expertise']
    gender = request.form['gender']
    other_role = request.form['other_role']
    fname = request.form['first_name']
    lname = request.form['family_name']
    email = request.form['email']
    phone = request.form['phone']
    dob = request.form['dob']
    address = request.form['address']
    city = request.form['city']
    state = request.form['state']
    pincode = request.form['pincode']
    resumePDF = request.files['resume']
    os.makedirs("resumes", exist_ok=True)
    
    resume_filename = secure_filename(resumePDF.filename or "resume")
    resume_path = os.path.join("resumes", resume_filename)
    resumePDF.save(resume_path)
    data = {
        "role": role,
        "gender": gender,
        "other_role": other_role,
        "fname": fname,
        "lname": lname,
        "email": email,
        "phone": phone,
        "dob": dob,
        "address": address,
        "city": city,
        "state": state,
        "pincode": pincode,
        "resume_path": resume_path
    }
    print(data)
    return """
        <script>
            alert("Form submitted successfully!");
            window.location.href = "/";
        </script>
"""

if __name__ == "__main__":
    # dirve = drive()
    # dirve.upload()
    # index()
    app.run(debug=True)