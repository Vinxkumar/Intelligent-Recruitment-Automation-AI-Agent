from openai import OpenAI
from dotenv import load_dotenv
import os
load_dotenv()

class OpenAIClient:
    def __init__(self):
        self.client = OpenAI(
            base_url = "https://models.github.ai/inference",
            api_key = os.getenv("GITHUB_TOKEN")
        )
    def invoke(self, prompt: str) -> str:
        response = self.client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "user", "content": prompt}
            ]
        )
        return response.choices[0].message.content or ""


