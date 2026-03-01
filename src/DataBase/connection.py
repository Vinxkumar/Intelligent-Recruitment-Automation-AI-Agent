from dotenv import load_dotenv
import mysql.connector
from mysql.connector import Error
import os

load_dotenv()

class Database:

    def connect(self):
        try:
            connect = mysql.connector.connect(
                    # host = "localhost",
                    # user = "root",
                    # password = "vinxkumar",
                    # database = "recruit",
                    # port = 3306
              host=os.getenv("HOSTNAME"),
              user=os.getenv("USER_NAME"),
              password=os.getenv("PASSWORD"),
              database=os.getenv("DATABASE"),
              port=3306,
              autocommit = True
            )
            if connect.is_connected():
                print("Connected to MySQL database")
                return connect
        except Error as e:
            print("Error while connecting to MySQL", e)
            return None
        # return ( mysql.connector.connect(
        #         host = "localhost",
        #         user = "root",
        #         password = "vinxkumar",
        #         database = "recruit",
        #         port = 3306
        #     )
        # )
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
            self.create_table_user()
            self.cursor.execute(queries.select_table_user, (username,))
            row = self.cursor.fetchone()
            return row["password"] if row else None #type: ignore
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

    def create_table_recruitment(self, table_name: str):
        sql = queries.create_table_recruitment.format(table_name=table_name)
        self.cursor.execute(sql)
        self.conn.commit()

    def close(self):
        self.conn.close()

    def getDriveStatus(self, drive_name:str):
        try:
            connect = self.connect()
            cursor = connect.cursor()
            cursor.execute(queries.check_Drive_status, (drive_name,))
            result = cursor.fetchone()
            print(f"Drive status for {drive_name}: {result[0] if result else 'Not found'}")  #type: ignore
            return result[0] if result else 'Not found' #type: ignore

        except Error as e:
            print(f"Error fetching drive status: {e}")
            return None
        
    def insertCandidate(self, table_name:str, candidate_data:tuple):
        try :
            drivename = table_name.strip().lower().replace(" ", "_")
            connect = self.connect()
            cursor = connect.cursor()
            cursor.execute(queries.insert_into_recruitment.format(table_name=drivename), candidate_data)
            return True
        except Error as e:
            print(f"Error inserting candidate data: {e}")
            return False
        finally:
            if connect.is_connected():
                cursor.close()
                connect.close()

    def selectCandidate(self, table_name:str):
        try:
            drivename = table_name.strip().lower().replace(" ", "_")
            connect = self.connect()
            cursor = connect.cursor(dictionary=True)
            cursor.execute(queries.select_recruitment.format(table_name=drivename))
            rows = cursor.fetchall()
            candidateData = {}
            for row in rows:
                candidateData[row["id"]] = {            #type: ignore
                    "name": row["name"],                #type: ignore
                    "lname": row["lname"],              #type: ignore
                    "phone": row["phone"],              #type: ignore
                    "email": row["email"],              #type: ignore
                    "resume_link": row["resume_link"]   #type: ignore
                }
            return candidateData
        except Error as e:
            print(f"Error fetching candidate data: {e}")
            return []
        finally:
            if connect.is_connected():
                cursor.close()
                connect.close()
            
    
    


#         self.conn = mysql.connector.connect(
#                 host = "localhost",
#                 user = "vinxkumar",
#                 password = "060814",
#                 database = "recruit",
#                 port = 3306
#         )
        