from src.DataBase.connection import curd
from src.Orchestrator.orchestrator import Orchestratory
from src.DataBase.queries import create_table_recruitment

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
    db.create_table_recruitment(str(drive_name).strip().lower().replace(" ", "_"))
    return post_status

def get_drive_list():
    db = curd()
    stat = ["Disabled", "Active"]
    drive_lists = db.select_drive()
    drivelists = []
    for drive_id, drive_info in drive_lists.items():  
        name, status = list(drive_info.items())[0]
        drivelists.append({"drive_name": name, "drive_status": stat[status]})
    print("Drive Lists:", drivelists) 
    return drivelists 

def update_drive_status(drive_name):
    db = curd()
    status = db.SelectDriveStatus(drive_name)
    print("status: ", status, " --- From datamediator/FrontEnd")
    return db.update_table_drive(drive_name, True if status==False else False)