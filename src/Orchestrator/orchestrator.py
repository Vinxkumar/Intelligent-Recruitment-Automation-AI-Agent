from ..AIClient.OpenAIClient import OpenAIClient
from .tasks import generate_job_description
from ..Post_telegram.post_to_telegram import TelegramPoster
from ..DataBase.connection import curd
# from threading import Thread

class Orchestratory:

    def __init__(self):
        self.JD = ""
        self.pst = TelegramPoster()
        self.db = curd()


    def getJD(self, hiring_requirements: dict):
        print("Generating Job Desc..../  [LOG][orcestratory.py/Orchestrator]")
        aiClient = OpenAIClient()
        job_description = generate_job_description(aiClient, hiring_requirements)
        self.JD = job_description
        
        status = self.postToTelegram(self.JD)
        return status
   
    def postToTelegram(self, JD):
        status = self.pst.post_message(JD)
        return status == 200

          
          

        
# if __name__ == "__main__":
    