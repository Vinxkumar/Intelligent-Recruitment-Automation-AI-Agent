// alert("Hello, World! This is a test alert from index_script.js.");

function displayDriveDetails() {
    const driveDetailsDiv = document.getElementById("driveDetails");
    drivelist = new Map();
    fetch('/giveDriveDetails')
        .then(response => response.json())
        .then(data => {
            let htmlContent = "";

            data.forEach(drive => {
                htmlContent += `
                  
                        <tr>
                            <td>                
                                <label
                                style="
                                    width: 300px;
                                    height: 40px;
                                    font-size: 25px; 
                                    font-family: 'Consolas';
                                    color:white; 
                                    padding: 5px; 
                                    margin: 10px 10px 10px 10px;
                                "
                                >
                                    <strong>${drive.drive_name}</strong>
                                </label>
                            </td>
                            <td>
                                <label 
                                style="
                                    width: 120px;
                                    height: 40px;
                                    font-size: 25px; 
                                    font-family: 'Consolas';
                                    color:white; 
                                    padding: 5px; 
                                    margin: 10px 10px 10px 10px;
                                ">
                                    <strong>${drive.drive_status}</strong>
                                </label>
                            </td>
                            <td>
                                <button name="${drive.drive_name}" onclick="listCandidates(this)">View Candidates</button>
                            </td>
                            <td>
                                <button name="${drive.drive_name}" onclick="handleDrive(this)">Initiate / Disable</button>
                            </td>
                        </tr>
                `;
            });
            driveDetailsDiv.innerHTML += htmlContent;
        })
        .catch(error => {
            console.error("Error fetching drive details:", error);
            alert("Failed to load drive details. Please try again later.");
            driveDetailsDiv.innerHTML = "<p>Failed to load drive details.</p>";
        });
        return
}

function handleDrive(button) {
    console.log("Button clicked");
    const driveName = button.getAttribute("name");
    console.log("Drive name:", driveName);

    fetch('/activeOrInactive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ driveName: driveName }),
        cache: "no-store"
    })
    .then(response => {
        console.log("Fetch response status:", response.status);
        return response.json();
    })
    .then(data => {
        console.log("Backend response:", data);
        if (data.success) {
            alert("Drive updated");
            window.location.reload();
        }
    })
    .catch(error => {
        console.error("Fetch error:", error);
    });
}
function listCandidates(button) {
    const driveName = button.getAttribute("name");
    alert(`Viewing candidates for drive: ${driveName}`);
    const element = document.getElementById("candet");
    element.classList.remove("hidden");
}

window.onload = displayDriveDetails;


