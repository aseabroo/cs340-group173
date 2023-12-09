// Get the objects we need to modify
let addUserForm = document.getElementById('addCustomerService');

// Modify the objects we need
addUserForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from

    let userInput = document.getElementById("customerInput");
    let applianceInput = document.getElementById("customerAppliance");
    let issueInput = document.getElementById("issueDescription");
    let dateInput = document.getElementById("dateReported");
    let statusInput = document.getElementById("csStatus")
    // Get the values from the form fields

    let userValue = userInput.value;
    let applianceValue = applianceInput.value;
    let issueValue = issueInput.value;
    let dataValue = dateInput.value;
    let statusValue = statusInput.value;

    // Put our data we want to send in a javascript object
    let data = {
        issueDescription: issueValue,
        resolutionStatus: statusValue,
        dateReported: dataValue,
        userID: userValue,
        applianceID: applianceValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-customerService-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction

            userInput.value = '';
            applianceInput.value = '';
            issueInput.value = '';
            dateInput.value = '';
            statusInput.value = '';
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
    let currentTable = document.getElementById("csTable");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let editCell = document.createElement("TD");
    let delCell = document.createElement("TD");
    let idCell = document.createElement("TD");
    let customerCell = document.createElement("TD");
    let applianceCell = document.createElement("TD");
    let issueCell = document.createElement("TD");
    let dateCell = document.createElement("TD");
    let resolutionCell = document.createElement("TD");


    // Fill the cells with correct data
    idCell.innerText = newRow.serviceID;
    customerCell = newRow.userID;
    applianceCell = newRow.applianceID;
    issueCell = newRow.issueDescription;
    dateCell = newRow.dateReported;
    resolutionCell = newRow.resolutionStatus;

    delCell = document.createElement("button");
    delCell.innerHTML = "Delete";
    delCell.onclick = function(){deleteCS(newRow.serviceID);}
/*
    delA = document.createElement("a");
    delA.innerHTML = "Delete";
    delA.href = "#";
    delA.onclick = function() {
        deleteUser(newRow.userID)
    };
    delCell.appendChild(delA);
*/

    // Add the cells to the row 
    row.appendChild(editCell);
    row.appendChild(delCell);
    row.appendChild(idCell);
    row.appendChild(customerCell);
    row.appendChild(applianceCell);
    row.appendChild(issueCell);
    row.appendChild(dateCell);
    row.appendChild(resolutionCell);
    
    row.setAttribute('data-value', newRow.id)
    // Add the row to the table
    currentTable.appendChild(row);

    // Find drop down menu, create a new option, fill data in the option (full name, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    //let selectMenu = document.getElementById("mySelect");
    //let option = document.createElement("option");
    //option.text = newRow.name;
    //option.value = newRow.id;
    //selectMenu.add(option);
}