import customtkinter as ctk
from src.DataBase.connection import curd

# TODO: Data ...?
conn = curd()

class HiringHistoryWindow:
    def __init__(self):
        self.conn = conn
        # self.cur = conn.cursor(dictionary=True) # type: ignore
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

        self.drives = self.conn.select_drive()
        self.drive_config = {}
        self.state = []

        self.label = []
        self.button = []
        self.pullDrivesFromDB()

    def displayActiveDrives(self, drive_name, drive_status = True):
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
        # if not drive_status:
        #     self.btn._fg_color = "red"
        # self.switch = ctk.CTkSwitch(
        #     self.Frame,

        # )
        # self.switch.grid(row=self.I, column = 2)
        self.btn = ctk.CTkButton(
                self.Frame,
                text = "Active",
                font = ("Helvetica", 18, "bold"),
                width = 100, height = 50,
                fg_color="green",
                corner_radius= 12,
                hover_color= "red",
                command=lambda drive_nm = drive_name, drive_st = drive_status: self.updateDriveStatus(drive_nm, True)
                # id = self.I
        )
        self.btn.grid(row = self.I, column = 1, padx = 5, pady = 30)
        self.btn = ctk.CTkButton(
                self.Frame,
                text = "Disable",
                font = ("Helvetica", 18, "bold"),
                width = 100, height = 50,
                fg_color="red",
                corner_radius= 12,
                hover_color= "green",
                command=lambda drive_nm = drive_name, drive_st = drive_status: self.updateDriveStatus(drive_nm, False)
                # id = self.I
        )
        self.btn.grid(row = self.I, column = 2, padx = 5, pady = 30)
        self.I += 1
        if not drive_status:
            self.btn._fg_color = "red"

    def pullDrivesFromDB(self):
        for index, (id, drive) in enumerate(self.drives.items()):
            for drive_name, drive_status in drive.items():
                st = ["Active","Diabled"]
                temp = st[1]
                if drive_status:
                    temp = st[0]
                self.displayActiveDrives(f"{drive_name}", drive_status)

    def updateDriveStatus(self, drive_name, drive_status):
        s =  self.conn.update_table_drive(drive_name, drive_status) #type: ignore

        self.driveHis.destroy()
        self.driveHis.update()
        PullDrives()