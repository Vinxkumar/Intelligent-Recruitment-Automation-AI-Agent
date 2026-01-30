from connection import connectTOMySQL
import queries

class CURD:

    def __init__(self) -> None:
        conn = connectTOMySQL()
        self.connect = conn.connect
        self.cur = self.connect.cursor()
        
    def create_table_drive(self):
        self.cur.execute(queries.create_table_drive)
        self.connect.commit()

    def create_table_recruitment(self, table_name: str):
        sql_query = queries.create_table_recruitment.format(table_name = table_name)
        self.cur.execute(sql_query)
        self.connect.commit()

    def curd(self, query:str, vals: tuple) ->bool:
        try:
            self.cur.execute(query, (vals))
            # self.conn.conn.commit()
            self.connect.commit()
            return True
        except Exception as e:
            print("DB error: ", e)
            return False
    

    # def 

