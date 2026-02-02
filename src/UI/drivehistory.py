import customtkinter as ctk
from src.DataBase.connection import Database
from src.DataBase.queries import select_drive

# TODO: Data ...?
conn = Database().connect()

class HiringHistoryWindow:
    def __init__(self):
        self.conn = conn
        self.cur = conn.cursor(dictionary=True) # type: ignore
        self.I = 1
        self.driveHis = ctk.CTk()
        self.driveHis.title("Active Drives")
        self.driveHis.geometry("1000x700")
        self.driveHis.configure(fg_color="#0E1117")
        self.driveHis.resizable(False, False)

        self.Frame = ctk.CTkFrame(
            self.driveHis,
            fg_color="#0E1117" # or "#0E1117"
        )
        # self.Frame.pack(fill="both", expand=True)
        self.Label = ctk.CTkLabel (
            self.Frame,
            text = "Created Drives",
            font = ("Helvetica", 21, "bold"),
            justify = "left",
        ).grid(row = 0, column = 0, padx = 30, pady = 30, sticky = "w")
        self.Frame.pack(fill="both", expand=True)

    def rnWin(self):
        self.driveHis.mainloop()

        # self.Frame.pack(fill="both", expand=True)

class PullDrives(HiringHistoryWindow):
    def __init__(self):
        super().__init__()
        self.cur.execute(select_drive)
        self.data = self.cur.fetchall()
        self.drives = {row["id"] :{row["drive_name"]:row["drive_status"]} for row in self.data} #type: ignore
        self.labels = []
        self.button = []
        # self.displayDrives()\
        self.pullDrivesFromDB()
        
    
    def displayActiveDrives(self, drive_name):
        self.lbl = ctk.CTkLabel(
                self.Frame,
                text=drive_name,
                text_color="white", # "white"
                font = ("Helvetica", 18, "bold"),
                fg_color = "black",
                corner_radius= 12,
                width = 700, height = 50,
                anchor= "w",
                justify = "left"
        )
        self.lbl.grid(row=self.I, column=0, padx=30, pady=30)
        self.btn = ctk.CTkButton(
                self.Frame,
                text = "Active",
                font = ("Helvetica", 18, "bold"),
                width = 100, height = 50,
                fg_color="green",
                corner_radius= 12,
                hover_color= "red",
                # id = self.I
        )
        self.btn.grid(row = self.I, column = 1, padx = 5, pady = 30)

        # self.btn.drive_id = self.I
        self.labels.append(self.lbl)
        self.button.append(self.btn)
        # print(self.button[index].drive_id,self.labels[index].drive_name, self.button[index].status)
            # self.drive_details.append({drive_name:True})
        # print(self.drive_details)
        self.I += 1

    def pullDrivesFromDB(self):
        for index, (id, drive) in enumerate(self.drives.items()):
            for drive_name, drive_status in drive.items():
                self.displayActiveDrives(drive_name)
                if not drive_status:
                    self.button[index].configure(
                        text="Disabled",
                        fg_color = "red",
                        hover_color = "green",
                    )
                    self.button[index].status = False
                else:
                    self.button[index].status = True
                    # print(self.btn.drive_id)
                # print(self.button[index].drive_id , ": ", self.labels[index].text)
                self.button[index].drive_id = id
                self.labels[index].drive_name = drive_name
                print(self.button[index].drive_id,self.labels[index].drive_name, self.button[index].status)

    def pull_drives_from_db(self):
        for index, (id, drive) in enumerate(self.drives.items()):
            for drive_name, drive_status in drive.items():
                self.displayActiveDrives(drive_name)
                if not drive_status:
                    self.button[index].configure(
                        text="Disabled",
                        fg_color = "red",
                        hover_color = "green",
                    )
                    self.button[index].status = False
                else:
                    self.button[index].status = True
                    # print(self.btn.drive_id)
                # print(self.button[index].drive_id , ": ", self.labels[index].text)
                self.button[index].drive_id = id
                self.labels[index].drive_name = drive_name
        self.rnWin()

