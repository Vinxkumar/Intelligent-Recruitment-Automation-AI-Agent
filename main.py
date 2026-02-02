from src.UI.mainui import mainWindow

    

def runUI():
    mainwindow = mainWindow()
    mainwindow.runMainWindowUI()

    # JD = Orchestratory().getJD(sample_requirements)
    # Orchestratory().postToTelegram(JD)
if __name__ == "__main__":
    runUI()