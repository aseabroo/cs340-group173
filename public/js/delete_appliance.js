/**
 * JavaScript for handling appliance deletion and updating the table.
 *
 * Citation:
 * Function Description: JavaScript code for handling the deletion of an appliance via AJAX request and dynamically updating the table.
 * Date: 12/11/2023
 * Originality: Adapted and refactored for specific use in an appliance management application. The structure and logic have been modified for the specific requirements of the application.
 * Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/blob/main/Step%208%20-%20Dynamically%20Updating%20Data/public/js/delete_person.js
 */

/**
 * Sends a DELETE request to the server to remove an appliance.
 * @param {string} applianceID - The ID of the appliance to be deleted.
 */
 function deleteAppliance(applianceID) {
    let data = { id: applianceID };

    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-appliance-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            // Delete the row from the table after successful deletion
            deleteRow(applianceID);
        } else if (xhttp.readyState == 4) {
            console.log("There was an error with the input.");
        }
    };

    xhttp.send(JSON.stringify(data));
}

/**
 * Removes the appliance row from the table.
 * @param {string} applianceID - The ID of the appliance whose row is to be removed.
 */
function deleteRow(applianceID) {
    let table = document.getElementById("applianceTable");

    for (let i = 0, row; row = table.rows[i]; i++) {
        if (row.getAttribute("data-value") == applianceID) {
            table.deleteRow(i);
            break;
        }
    }
}
