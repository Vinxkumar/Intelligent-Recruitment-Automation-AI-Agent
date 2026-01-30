from dotenv import load_dotenv
from mysql.connector import Error

import mysql.connector
import os

load_dotenv()

class connectTOMySQL:
    def __init__(self):
        self.host = os.getenv("HOSTNAME")
        self.database = os.getenv("DATABASE")
        self.username = os.getenv("USER_NAME")
        self.port = os.getenv("PORT")
        self.password = os.getenv("PASSWORD")

    # def connect(self):
        try:
            self.conn = mysql.connector.connect(
                host = self.host,
                database = self.database,
                user = self.username,
                port = int(self.port) if self.port else None,
                password = self.password
            )
            if self.conn.is_connected():
                # return self.conn.cursor()
                print("Coonnection Sucessfull")
                self.cursor = self.conn.cursor()
                self.connect = self.conn
                # self.conn.commit()
        except Error as e:
            print(f"Error connecting to MySQL: {e}")
            self.conn = None

if __name__ == "__main__":
    connectTOMySQL()