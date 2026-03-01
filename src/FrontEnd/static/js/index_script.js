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
                    <center>
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
                                <button name="${drive.drive_name}" id="btn" onclick="listCandidates()">View Candidates</button>
                            </td>
                            <td>
                                <button name="${drive.drive_name}" id="btn" onclick="handleDrive()">Initiate / Disable</button>
                            </td>
                        </tr>
                    </center>
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

function handleDrive() {
    const driveName = document.getElementById("btn").getAttribute("name");
    fetch('/activeOrInactive', {
        method: 'POST',
        headers: {  'Content-Type': 'application/json' },
        body: JSON.stringify({driveName})
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Drive status updated successfully!");
                window.location.reload(); // Reload the page to reflect changes
            } else {
                alert("Failed to update drive status.");
            }
        })
        .catch(error => {
            console.error("Error updating drive status:", error);
            alert("An error occurred while updating drive status.");
        });
}
function listCandidates() {
    const driveName = document.getElementById("btn").getAttribute("name");
    alert(`Viewing candidates for drive: ${driveName}`);
    fetch('/CandidateDetails')
        .then(response => response.text())
        .then(html => {
            document.open();
            document.write(html);
            document.close();
        })
        .catch(error => {
            console.error("Error loading candidate details:", error);
            alert("Failed to load candidate details. Please try again later.");
        });
}

window.onload = displayDriveDetails;



