from ..Prompts.prompts import JOB_DESCRIPTION


def generate_job_description(ai_client, hiring_requirements):
    prompt = JOB_DESCRIPTION.format(hiring_requirements=hiring_requirements)
    response = ai_client.invoke(prompt)
    return response


