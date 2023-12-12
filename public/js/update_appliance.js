/**
 * JavaScript for handling the update appliance form submission and table update.
 *
 * Citation:
 * Function Description: JavaScript code for handling form submission and updating table data on a webpage.
 * Date: 12/11/2023
 * Originality: Adapted from OSU CS340 and shortened, cleaned and reformatted code for clarity and readability.
 * Source URL:https://github.com/osu-cs340-ecampus/nodejs-starter-app/blob/main/Step%208%20-%20Dynamically%20Updating%20Data/public/js/update_person.js
 * 
 */

// Add event listener to the update appliance form to handle form submission
let updateApplianceForm = document.getElementById('update-appliance-form-ajax');
updateApplianceForm.addEventListener("submit", function (e) {
    //console.log('submit working');
    e.preventDefault(); // Prevent default form submission

    // Get values from form fields
    let inputApplianceID = document.getElementById("applianceIDSelect").value;
    let inputModel = document.getElementById("input-modelUpdate").value;
    let inputDatePurchased = document.getElementById("input-datePurchasedUpdate").value;
    let inputLastUpdated = document.getElementById("input-lastUpdatedUpdate").value;
    let inputUserID = document.getElementById("input-userIDUpdate").value;

    if(inputApplianceID == '' || inputModel == '' || inputDatePurchased == '' || inputLastUpdated == '') {
        return;
    }

    // Create data object for AJAX request
    let data = {
        applianceID: inputApplianceID,
        model: inputModel,
        datePurchased: inputDatePurchased,
        lastUpdated: inputLastUpdated,
        userID: inputUserID
    };

    // Initialize AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-appliance-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            updateRow(xhttp.response, inputApplianceID);
            // Reset the form fields after successful update
            updateApplianceForm.reset();
        } else if (xhttp.readyState == 4) {
            console.log("There was an error with the input.");
        }
    };
    xhttp.send(JSON.stringify(data));
});

// Update the table row with new appliance data
function updateRow(data, applianceID) {
    let parsedData = JSON.parse(data);
    let table = document.getElementById("applianceTable");
    
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (row.getAttribute("data-value") == applianceID) {
            // Update the table row with new data
            row.cells[3].innerHTML = parsedData[0].model; 
            row.cells[4].innerHTML = parsedData[0].datePurchased;
            row.cells[5].innerHTML = parsedData[0].lastUpdated;
            row.cells[6].innerHTML = parsedData[0].userID;
        }
    }
}
