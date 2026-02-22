// alert("Hello, World! This is a test alert from index_script.js.");

function displayDriveDetails() {
    const driveDetailsDiv = document.getElementById("driveDetails");

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
}

function handleDrive() {
    const driveName = document.getElementById("btn").getAttribute("name");
    alert(`You clicked on drive: ${driveName}`);

}
function listCandidates() {
    const driveName = document.getElementById("btn").getAttribute("name");
    alert(`You want to view candidates for drive: ${driveName}`);
}

window.onload = displayDriveDetails;



