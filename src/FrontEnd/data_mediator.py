from src.DataBase.connection import curd
from src.Orchestrator.orchestrator import Orchestratory
def verify_user(username: str, password: str) -> bool:
    db = curd()
    user_password = db.select_table_user(username)
    if user_password == password:
        return True
    else:
        print("Invalid username or password")
        return False
    
def get_drive_details(drive_details: dict):
    db = curd()
    orchestrator = Orchestratory()
    drive_name = drive_details.get("role_name")
    drive_status = orchestrator.getJD(drive_details)
    post_status = db.insert_into_table_drive((drive_name, drive_status))
    return post_status