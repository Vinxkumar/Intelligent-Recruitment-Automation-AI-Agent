from src.DataBase.connection import curd

def verify_user(username: str, password: str) -> bool:
    db = curd()
    user_password = db.select_table_user(username)
    if user_password == password:
        return True
    else:
        return False