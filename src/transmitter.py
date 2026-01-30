from src.Orchestrator.orchestrator import Orchestratory


global orchestrator
global status
orchestrator = Orchestratory()
def dataTransmitter(summary: str):
    status, JD = orchestrator.getJD(summary)
    return status, JD