alert("Hello, World! This is a test alert from index_script.js.");

function displayDriveDetails() {
    const driveDetailsDiv = document.getElementById("driveDetails"); // ✅ defined in scope

    fetch('/giveDriveDetails')
        .then(response => response.json())
        .then(data => {
            let htmlContent = "<ul>";
            data.forEach(drive => {
                htmlContent += `<li><strong>${drive.drive_name}</strong>: ${drive.drive_status}</li>`;
            });
            htmlContent += "</ul>";
            driveDetailsDiv.innerHTML = htmlContent;
        })
        .catch(error => {
            console.error("Error fetching drive details:", error);
            alert("Failed to load drive details. Please try again later.");
            driveDetailsDiv.innerHTML = "<p>Failed to load drive details.</p>";
        });
}

window.onload = displayDriveDetails;



