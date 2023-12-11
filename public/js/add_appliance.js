// Get the objects we need to modify
let addApplianceForm = document.getElementById('addAppliance');

// Modify the objects we need
addApplianceForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputModel = document.getElementById("input-model");
    let inputDatePurchased = document.getElementById("input-datePurchased");
    let inputLastUpdated = document.getElementById("input-lastUpdated");
    let inputUserID = document.getElementById("input-userID");

    // Get the values from the form fields
    let modelValue = inputModel.value;
    let datePurchasedValue = inputDatePurchased.value;
    let lastUpdatedValue = inputLastUpdated.value;
    let userIDValue = inputUserID.value;

    // Put our data we want to send in a javascript object
    let data = {
        model: modelValue,
        datePurchased : datePurchasedValue,
        lastUpdated: lastUpdatedValue,
        userID: userIDValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-appliance-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputModel.value = '';
            inputDatePurchased.value = '';
            inputLastUpdated.value = '';
            inputUserID.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("applianceTable");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create 'Edit' link
    let editLink = document.createElement("a");
    editLink.href = "#";
    editLink.innerText = "Edit";
    editLink.onclick = function() { updateAppliance(newRow.applianceID); };
    
    // Create 'Delete' button
    let deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.onclick = function() { deleteAppliance(newRow.applianceID); };
    

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let editCell = document.createElement("TD");
    let delCell = document.createElement("TD");
    let idCell = document.createElement("TD");
    let modelCell = document.createElement("TD");
    let datePurchasedCell = document.createElement("TD");
    let lastUpdatedCell = document.createElement("TD");
    let userIDCell = document.createElement("TD");

    // Fill the cells with correct data
    editLink.innerText = "Edit";
    idCell.innerText = newRow.applianceID;
    modelCell.innerText = newRow.model;
    datePurchasedCell.innerText = newRow.datePurchased;
    lastUpdatedCell.innerText = newRow.lastUpdated;
    userIDCell.innerText = newRow.userID;

    // Add the cells to the row 
    editCell.appendChild(editLink);
    delCell.appendChild(deleteButton);
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
