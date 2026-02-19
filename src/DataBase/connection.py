from dotenv import load_dotenv
import mysql.connector
from mysql.connector import Error
import os

load_dotenv()

class Database:

    def connect(self):
        
        return ( mysql.connector.connect(
                host = "localhost",
                user = "vinxkumar",
                password = "060814",
                database = "recruit",
                port = 3306
            )
        )
        # return (mysql.connector.connect(
        #         host=os.getenv("HOSTNAME"),
        #         user=os.getenv("USER_NAME"),
        #         password=os.getenv("PASSWORD"),
        #         database=os.getenv("DATABASE"),
        #         port=int(os.getenv("PORT", 3306)),
        #         autocommit = True
        #     )
        # )


# from src.DataBase.connection import Database
from src.DataBase import queries


class curd(Database):
    def __init__(self):
    
        self.conn = self.connect()
        self.cursor = self.conn.cursor(dictionary=True)

    def create_table_user(self):
        self.cursor.execute(queries.create_table_user)
        self.conn.commit()
    
    def insert_into_table_user(self, val: tuple) -> bool:    # Expectes (name, username, password)
        
        try:
            self.create_table_user()
            self.cursor.execute(queries.insert_into_user, val)
            self.conn.commit()
            
            return True
        except Error as e:
            print("DB Error:", e)
            return False

    def select_table_user(self, username: str):
        try:
            self.cursor.execute(queries.select_table_user, (username,))
            row = self.cursor.fetchone()
            return [row["username"], row["password"]] if row else None #type: ignore
        except Error as e:
            print("DB Error:", e)
            return None

    def create_table_drive(self):
        self.cursor.execute(queries.create_table_drive)
        self.conn.commit()

    def insert_into_table_drive(self, val: tuple) -> bool:    # Expectes (drive_name, drive_status)
        
        try:
            self.create_table_drive()
            self.cursor.execute(queries.insert_into_drive, val)
            self.conn.commit()
            
            return True
        except Error as e:
            print("DB Error:", e)
            return False

    def update_table_drive(self, drive_name, drive_status) -> bool:
        try:
            self.cursor.execute(queries.update_table_drive_status, (drive_status, drive_name))
            self.conn.commit()
            return True
        except Error as e:
            print("DB Error:", e)
            return False

    def delete_table_drive(self, drive_name: str) -> bool:
        try:
            sql = queries.delete_drive.format(drive_name=drive_name)
            self.cursor.execute(sql)
            self.conn.commit()
            return True
        except Error as e:
            print("DB Error:", e)
            return False
    
    def select_drive(self):
        try:
            cur = self.conn.cursor(dictionary=True)
            cur.execute(queries.select_drive)
            rows = cur.fetchall()

            drives = {}
            for row in rows:
                drives[row["id"]] = {                  #type: ignore 
                row["drive_name"]: row["drive_status"] #type: ignore
                } 
            return drives

        except Error as e:
            print("DB Error:", e)
            return {}

    def close(self):
        self.conn.close()

            
    
    


#         self.conn = mysql.connector.connect(
#                 host = "localhost",
#                 user = "vinxkumar",
#                 password = "060814",
#                 database = "recruit",
#                 port = 3306
#         )
        