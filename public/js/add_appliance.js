/**
 * JavaScript for handling the addition of appliances and dynamically updating the table.
 *
 * Citation:
 * Function Description: JavaScript code for handling the addition of appliance data via form submission and dynamically updating the appliance table.
 * Date: 12/11/2023
 * Originality: Adapted and refactored for specific use in an appliance management application. Code structure and logic were modified for the specific requirements of the application.
 * Source URL:  https://github.com/osu-cs340-ecampus/nodejs-starter-app/blob/main/Step%208%20-%20Dynamically%20Updating%20Data/public/js/add_person.js
 */

// Add event listener to the add appliance form to handle form submission
let addApplianceForm = document.getElementById('addAppliance');
addApplianceForm.addEventListener("submit", function (e) {
    console.log('submit working');
    e.preventDefault(); // Prevent default form submission

    // Get values from form fields
    let modelValue = document.getElementById("input-model").value;
    let datePurchasedValue = document.getElementById("input-datePurchased").value;
    let lastUpdatedValue = document.getElementById("input-lastUpdated").value;
    let userIDValue = document.getElementById("input-userID").value;

    if(modelValue == '' || datePurchasedValue == '' || lastUpdatedValue == '') {
        return;
    }


    // Create data object for AJAX request
    let data = {
        model: modelValue,
        datePurchased: datePurchasedValue,
        lastUpdated: lastUpdatedValue,
        userID: userIDValue
    };

    // Initialize AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-appliance-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Handle AJAX request response
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            addRowToTable(xhttp.response); // Add the new data to the table
            addApplianceForm.reset(); // Clear the input fields after successful addition
        } else if (xhttp.readyState == 4) {
            console.log("There was an error with the input.");
        }
    };

    // Send the request with the data
    xhttp.send(JSON.stringify(data));
});

// Add a new row to the appliance table with the data from the response
function addRowToTable(data) {
    let currentTable = document.getElementById("applianceTable");
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1];

    // Create 'Edit' and 'Delete' elements
    let editLink = createEditLink(newRow.applianceID);
    let deleteButton = createDeleteButton(newRow.applianceID);

    // Create new table row and cells
    let row = document.createElement("TR");
    let editCell = document.createElement("TD");
    let delCell = document.createElement("TD");
    let idCell = createCell(newRow.applianceID);
    let modelCell = createCell(newRow.model);
    let datePurchasedCell = createCell(newRow.datePurchased);
    let lastUpdatedCell = createCell(newRow.lastUpdated);
    let userIDCell = createCell(newRow.userID);

    // Append elements to the cells
    editCell.appendChild(editLink);
    delCell.appendChild(deleteButton);

    // Add cells to the row
    row.appendChild(editCell);
    row.appendChild(delCell);
    row.appendChild(idCell);
    row.appendChild(modelCell);
    row.appendChild(datePurchasedCell);
    row.appendChild(lastUpdatedCell);
    row.appendChild(userIDCell);

    // Add the row to the table
    currentTable.appendChild(row);
}

// Helper function to create a table cell
function createCell(text) {
    let cell = document.createElement("TD");
    cell.innerText = text;
    return cell;
}

// Helper function to create an edit link
function createEditLink(applianceID) {
    let link = document.createElement("a");
    link.href = "#";
    link.innerText = "Edit";
    link.onclick = function() { updateAppliance(applianceID); };
    return link;
}

// Helper function to create a delete button
function createDeleteButton(applianceID) {
    let button = document.createElement("button");
    button.innerText = "Delete";
    button.onclick = function() { deleteAppliance(applianceID); };
    return button;
}
