import requests
import os
from dotenv import load_dotenv

load_dotenv()

class TelegramPoster:
    def __init__(self):
        self.TELEGRAM_BOT_API_KEY = os.getenv("TELEGRAM_BOT_API_KEY")
        self.TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID")
        self.api_url = f"https://api.telegram.org/bot{self.TELEGRAM_BOT_API_KEY}/sendMessage"   

    def post_message(self, post: str):
        payload = {
            'chat_id': self.TELEGRAM_CHAT_ID,
            'text': post,
            
        }
        response = requests.post(self.api_url, json=payload)
        return response.status_code