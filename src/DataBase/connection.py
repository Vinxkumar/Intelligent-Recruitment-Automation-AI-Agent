from dotenv import load_dotenv
import mysql.connector
from mysql.connector import Error
import os
from src.DataBase import queries

load_dotenv()

class connectTOMySQL:
    def __init__(self):
        self.host = os.getenv("HOSTNAME")
        self.database = os.getenv("DATABASE")
        self.username = os.getenv("USER_NAME")
        self.port = os.getenv("PORT")
        self.password = os.getenv("PASSWORD")
        # try:
        self.conn = mysql.connector.connect(
                host = self.host,
                database = self.database,
                user = self.username,
                port = int(self.port) if self.port else None,
                password = self.password
        )

        #     if not self.conn.is_connected():
        #         raise RuntimeError("MySQL connection failed")

        # except Error as e:
        #     raise RuntimeError(f"MySQL connection error: {e}")

    def get_connection(self):
         return (
            mysql.connector.connect(
                host = self.host,
                database = self.database,
                user = self.username,
                port = int(self.port) if self.port else None,
                password = self.password
            )
        )

    def get_cursor(self):
        return self.conn.cursor()

    def close(self):
        if self.conn and self.conn.is_connected():
            self.conn.close()


class curd:
    def __init__(self):
        obj = connectTOMySQL()
        self.connect =obj.get_connection()
        self.cursor = self.connect.cursor()
    def create_table_drive(self):
        self.cursor.execute(queries.create_table_drive)
        self.connect.commit()
    
    def insert_into_table_drive(self, val:tuple):
        try:
            self.create_table_drive()
            self.cursor.execute(queries.insert_into_drive, val)
            self.connect.commit()
            return True
        except Error as e:
            print("Error: ", e)
        
    def update_table_drive(self, drive_name, drive_status):
        try:
            sql = queries.update_table_drive_status.format(
                drive_name=drive_name, 
                drive_status = drive_status
            )
            self.cursor.execute(sql)
            self.connect.commit()
            return True
        except Error as e:
            print("Error: ", e)
            
    def delete_table_drive(self, drive_name: str):
        try:
            sql = queries.delete_drive.format(drive_name = drive_name)
            self.cursor.execute(sql)
            self.connect.commit()
            return True
        except Error as e:
            print("Error: ", e)
            
    
    

# from dotenv import load_dotenv
# from mysql.connector import Error
# from src.DataBase.queries import *
# import mysql.connector
# import os

# conn = mysql.connector.connect(
#                 host = "localhost",
#                 user = "vinxkumar",
#                 password = "060814",
#                 database = "recruit",
#                 port = 3306
#         )

# load_dotenv()

# class connectTOMySQL:
    
#     def __init__(self):
#         self.conn = mysql.connector.connect(
#                 host = "localhost",
#                 user = "vinxkumar",
#                 password = "060814",
#                 database = "recruit",
#                 port = 3306
#         )
        
#         # self.cursor = self.conn.cursor()
#         # self.connect = self.conn

        
#     #     self.cursor = self.conn.cursor()
#     #     self.connect = self.conn

#     # def get(self):
#     #     return self.conn


    

#     # class CURD:
            
#     #     def create_table_drive(self):
#     #         self.conn 
#     #         self.cur.execute(create_table_drive)
#     #         self.connect.commit()

#     #     def insert_into_table_drive(self, val:tuple):
#     #         self.create_table_drive()
#     #         self.cur.execute(insert_into_drive, val)
#     #         self.connect.commit()

#     #     def update_table_drive(self, drive_name, drive_status):

#     #         sql = update_table_drive_status.format(drive_name=drive_name, drive_status = drive_status)
#     #         self.cur.execute(sql)
#     #         self.connect.commit()

#     #     def delete_Drive(self, drive_name):
#     #         sql = delete_drive.format(drive_name = drive_name)
#     #         self.cur.execute(sql)
#     #         self.connect.commit()



#     #     def create_table_recruitment(self, table_name: str):
#     #         sql_query = create_table_recruitment.format(table_name = table_name)
#     #         self.cur.execute(sql_query)
#     #         self.connect.commit()

#     #     def curd(self, query:str, vals: tuple) ->bool:
#     #         try:
#     #             self.cur.execute(query, (vals))
#     #             # self.conn.conn.commit()
#     #             self.connect.commit()
#     #             return True
#     #         except Exception as e:
#     #             print("DB error: ", e)
#     #             return False

#     # def connect(self):
#         # try:

            

            
        
#         # if self.conn.is_connected():
#         #         # return self.conn.cursor()
#         #         print("Coonnection Sucessfull")
#         #         self.cursor = self.conn.cursor()
#         #         self.connect = self.conn
#                 # self.conn.commit()
#         # except Error as e:
#         #     print(f"Error connecting to MySQL: {e}")
#         #     self.conn = None

# if __name__ == "__main__":
#     connectTOMySQL()




# # LIVE MySQL Server

#             # self.conn = mysql.connector.connect(
#             #     host = self.host,
#             #     database = self.database,
#             #     user = self.username,
#             #     port = int(self.port) if self.port else None,
#             #     password = self.password
#             # )

# # self.host = os.getenv("HOSTNAME")
# #         self.database = os.getenv("DATABASE")
# #         self.username = os.getenv("USER_NAME")
# #         self.port = os.getenv("PORT")
# #         self.password = os.getenv("PASSWORD")