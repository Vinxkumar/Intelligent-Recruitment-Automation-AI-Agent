from threading import Thread
from ..transmitter import dataTransmitter, orchestrator
from src.UI.drivehistory import PullDrives

import customtkinter as ctk
import time

db = orchestrator.db

MAIN_WINDOW = None
# Hiring_Requirements = None
# orchestrator = Orchestratory()
class mainWindow:
    def __init__(self):
        global MAIN_WINDOW
        ctk.set_appearance_mode("dark")
        ctk.set_default_color_theme("dark-blue")
        self.t1 = Thread(target = PullDrives)

        self.mainwindow = ctk.CTk()
        self.mainwindow.title("Intelligent Recruitment Automation Agent")
        self.mainwindow.geometry("1000x700")
        self.mainwindow.resizable(False, False)

        self.frame = ctk.CTkFrame(
            self.mainwindow,
            width=400, height=400,
            fg_color="#0E1117"
        )
        self.frame.pack(fill="both", expand=True)

        self.flabel = ctk.CTkLabel(
            self.frame,
            text="Intelligent Recruitment Automation Agent",
            font=("Helvetica", 25, "bold")
        )
        self.flabel.pack(side="left", anchor="nw", pady=30, padx=30)
        self.fActiveButton = ctk.CTkButton (
            self.frame,
            text = "Active Drive",
            width=100, height=50,
            font=("Helvetica", 20),
            # fg_color="#94b8b4",
            command = lambda: PullDrives(),
            corner_radius=15,

        ).pack(padx = 30, pady=30,side = "right", anchor="ne")
        self.flabel_bottom = ctk.CTkLabel(
            self.frame,
            text="@Vinod Kumar S",
            font=("Helvetica", 12)
        )
        self.flabel_bottom.place(x=870, y=665)

        self.fbtn_start_recruitment = ctk.CTkButton(
            self.frame,
            text="Start Recruitment Drive",
            width=100, height=50,
            font=("Helvetica", 20),
            fg_color="green",
            corner_radius=15,
            command=lambda: secWindow()
        )
        self.fbtn_start_recruitment.place(x=30, y=90)

        self.ftextbx = ctk.CTkTextbox(
            self.frame,
            font=("Consolas", 18, "bold"),
            height=500, width=935,
            corner_radius=20,
            fg_color="black"
        )
        self.ftextbx.place(x=30, y=165)
        self.ftextbx.insert("1.0", "* status [ Idle ]")
        self.ftextbx.configure(state="disabled")

        MAIN_WINDOW = self

    def runMainWindowUI(self):
        self.mainwindow.mainloop()

class secWindow:
    def __init__(self):

        global MAIN_WINDOW
        if MAIN_WINDOW is None:
            raise RuntimeError("Main window not initialized. Create mainWindow before opening secWindow.")

        self.parent = MAIN_WINDOW
        # use parent's tk root as the master for the toplevel
        self.secWin = ctk.CTkToplevel(self.parent.mainwindow)
        self.secWin.title("Hiring Requirements")
        self.secWin.geometry("770x600")
        self.secWin.configure(fg_color="#0E1117")
        self.secWin.resizable(False, False)

        self.slabel = ctk.CTkLabel(
            self.secWin,
            text="Enter the Hiring Requirements",
            font=("Helvetica", 22, "bold")
        )
        self.slabel.place(x=30, y=30, anchor="nw")

        # Role
        self.slabel_role = ctk.CTkLabel(
            self.secWin,
            text="Role", font=("Helvetica", 18, "bold")
        )
        self.slabel_role.place(x=30, y=80, anchor="nw")

        self.srole_box = ctk.CTkEntry(
            self.secWin,
            placeholder_text="Enter the Role",
            width=300, height=40,
            font=("Helvetica", 18)
        )
        self.srole_box.place(x=30, y=110, anchor="nw")

        # Must-have skills
        self.slabel_mskills = ctk.CTkLabel(
            self.secWin,
            text="Skills [Must to Have]",
            font=("Helvetica", 18, "bold")
        )
        self.slabel_mskills.place(x=30, y=170, anchor="nw")

        self.smsklls_box = ctk.CTkEntry(
            self.secWin,
            width=300, height=40,
            placeholder_text="Eg: python, Machine Learning etc..",
            font=("Helvetica", 18)
        )
        self.smsklls_box.place(x=30, y=200, anchor="nw")

        # Nice-to-have skills
        self.slabel_nskills = ctk.CTkLabel(
            self.secWin,
            text="Skills [Nice to Have]",
            font=("Helvetica", 18, "bold")
        )
        self.slabel_nskills.place(x=30, y=260, anchor="nw")

        self.snsklls_box = ctk.CTkEntry(
            self.secWin,
            width=300, height=40,
            placeholder_text="Eg: API, NLP etc...",
            font=("Helvetica", 18)
        )
        self.snsklls_box.place(x=30, y=290, anchor="nw")

        # Experience
        self.slabel_experience = ctk.CTkLabel(
            self.secWin,
            text="Experience",
            font=("Helvetica", 18, "bold")
        )
        self.slabel_experience.place(x=30, y=350, anchor="nw")

        self.sexperience_box = ctk.CTkEntry(
            self.secWin,
            width=300, height=40,
            placeholder_text="Eg: 0 - 2",
            font=("Helvetica", 18)
        )
        self.sexperience_box.place(x=30, y=380, anchor="nw")

        # Location
        self.slabel_location = ctk.CTkLabel(
            self.secWin,
            text="Location",
            font=("Helvetica", 18, "bold")
        )
        self.slabel_location.place(x=400, y=80, anchor="nw")

        self.slocation_box = ctk.CTkEntry(
            self.secWin,
            width=300, height=40,
            placeholder_text="Enter the location",
            font=("Helvetica", 18)
        )
        self.slocation_box.place(x=400, y=110, anchor="nw")

        # CTC
        self.slabel_ctc = ctk.CTkLabel(
            self.secWin,
            text="CTC",
            font=("Helvetica", 18, "bold")
        )
        self.slabel_ctc.place(x=400, y=170, anchor="nw")

        self.sctc_box = ctk.CTkEntry(
            self.secWin,
            width=300, height=40,
            placeholder_text="Eg: 0 - 3",
            font=("Helvetica", 18)
        )
        self.sctc_box.place(x=400, y=200, anchor="nw")

        # Employment type
        self.slabel_emptype = ctk.CTkLabel(
            self.secWin,
            text="Employment-type",
            font=("Helvetica", 18, "bold")
        )
        self.slabel_emptype.place(x=400, y=260, anchor="nw")

        self.emptyp = ctk.StringVar(self.secWin, value="Full-time")

        self.semptyp_fulltime_radio = ctk.CTkRadioButton(
            self.secWin,
            text="Full-time",
            value="Full-time",
            variable=self.emptyp,
            font=("Helvetica", 18)
        )
        self.semptyp_fulltime_radio.place(x=400, y=290, anchor="nw")

        self.semptyp_parttime_radio = ctk.CTkRadioButton(
            self.secWin,
            text="Part-time",
            value="Part-time",
            variable=self.emptyp,
            font=("Helvetica", 18)
        )
        self.semptyp_parttime_radio.place(x=400, y=330, anchor="nw")

        self.semptyp_intern_radio = ctk.CTkRadioButton(
            self.secWin,
            text="Internship",
            value="Internship",
            variable=self.emptyp,
            font=("Helvetica", 18)
        )
        self.semptyp_intern_radio.place(x=400, y=370, anchor="nw")

        # Submit button
        self.ssubmit_button = ctk.CTkButton(
            self.secWin,
            fg_color="#F59E0B",
            text="Submit",
            text_color="black",
            corner_radius=18,
            hover_color="white",
            command=self.on_submit,
            width=400, height=40,
            font=("Helvetica", 18, "bold")
        )
        self.ssubmit_button.place(x=230, y=500)

    def on_submit(self):
        # collect values
        role = self.srole_box.get().strip()
        must_skills = self.smsklls_box.get().strip()
        nice_skills = self.snsklls_box.get().strip()
        experience = self.sexperience_box.get().strip()
        location = self.slocation_box.get().strip()
        ctc = self.sctc_box.get().strip()
        empl_type = self.emptyp.get()
        self.secWin.destroy()
        self.secWin.update()
        t1 = Thread(target = PullDrives().displayActiveDrives(role))
        t1.start()

        summary_lines = [
            f"  Role: {role or 'N/A'}",
            f"  Must-have Skills: [{must_skills or 'N/A'}]",
            f"  Nice-to-have Skills: [{nice_skills or 'N/A'}]",
            f"  Experience: [{experience or 'N/A'}]",
            f"  Location: {location or 'N/A'}",
            f"  CTC: {ctc or 'N/A'}",
            f"  Employment Type: {empl_type}"
        ]
              
        Hiring_Requirements= "\n".join(summary_lines)
        self.textBox_status(f"Json Format of the Hiring Requirements:\n{Hiring_Requirements}")
        self.textBox_status("Generating Job Description..../\n")
        db.insert_into_table_drive((role, True))
        # TODO: status, JD = dataTransmitter(Hiring_Requirements)
        time.sleep(4)
        self.textBox_status(f"\nJob Description Generated...../\n")
        self.textBox_status("\nPosting..../")
        time.sleep(2)


        # TODO:
        # status, JD = orchestrator.postToTelegram(status)


        # TODO: 
        # txt = "Error: Failed to Post Job.....!"
        # if status :
        #     txt = "Job posted Sucessfully.....!"
        # self.textBox_status(txt)
        # self.textBox_status(f"Preview:\n\n{JD}")
        # # optionally close the requirements window
        # # self.secWin.destroy()

    def textBox_status(self, text: str):
        # append status to main window textbox
        tb = self.parent.ftextbx
        tb.configure(state="normal")
        tb.insert("end", f"\n\n{text}")
        tb.configure(state="disabled")


    # def 
