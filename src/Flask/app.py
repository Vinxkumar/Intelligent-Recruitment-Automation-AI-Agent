import os
from flask import Flask, render_template, request

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.errors import HttpError
from googleapiclient.http import MediaFileUpload
from googleapiclient.discovery import build

SCOPES = ["https://www.googleapis.com/auth/drive.metadata.readonly",
          "https://www.googleapis.com/auth/drive.file",
          "https://www.googleapis.com/auth/drive"  
          
         ]

class drive:
    def __init__(self):
        self.creds = None

        if os.path.exists("token.json"):
            self.creds = Credentials.from_authorized_user_file(
                "token.json", SCOPES
            )

        if not self.creds or not self.creds.valid:
            if self.creds and self.creds.expired and self.creds.refresh_token:
                self.creds.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file(
                    "src/Flask/credentials.json", SCOPES
                )
                self.creds = flow.run_local_server(port=0)

            with open("token.json", "w") as token:
                token.write(self.creds.to_json())

    def upload(self):
        try:
            service = build("drive", "v3", credentials=self.creds)
            file_metadata = {
                "name": "sample.gspread"
            }
            # media = MediaFileUpload("sample")
            file = service.files().create(
                body = file_metadata, 
                fields = 'id'
            ).execute()
            print(file.get('id'))
        except HttpError as e:
            print(e)

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

# @app.route('/submit', methods=['POST'])
# def handler():
#     return "helloworld"

if __name__ == "__main__":
    dirve = drive()
    dirve.upload()