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
                {"role":"system", "content" : """You are a Recruitment Automation Agent who does work as follows
                    1. You receive hiring requirements in a json format.
                    2. You generate a professional job description based on the requirements.
                    3. You generate a short LinkedIn style job post based on the requirements.
                    4. You strictly adhere to the role level based on experience range provided in the requirements.
                    5. Screen resumes and give a score in a scale of 1-10 based on the match between the resume and the provided requirements."""
                 },
                {"role": "user", "content": prompt}
            ]
        )
        return response.choices[0].message.content or ""


