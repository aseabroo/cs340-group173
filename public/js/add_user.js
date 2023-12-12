/**
 * JavaScript for handling the addition of appliances and dynamically updating the table.
 *
 * Citation:
 * Function Description: JavaScript code for handling the addition of appliance data via form submission and dynamically updating the table.
 * Date: 12/11/2023
 * Originality: Adapted and refactored for specific use in an appliance management application. Code structure and logic were modified for the specific requirements of the application.
 * Source URL:  https://github.com/osu-cs340-ecampus/nodejs-starter-app/blob/main/Step%208%20-%20Dynamically%20Updating%20Data/public/js/add_person.js
 */

// Get the objects we need to modify
let addUserForm = document.getElementById('addUser');

// Modify the objects we need
addUserForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let nameInput = document.getElementById("nameInput");
    let emailInput = document.getElementById("emailInput");
    let addressInput = document.getElementById("addressInput");
    let phoneInput = document.getElementById("phoneInput");

    // Get the values from the form fields
    let nameValue = nameInput.value;
    let emailValue = emailInput.value;
    let addressValue = addressInput.value;
    let phoneValue = phoneInput.value;

    // Put our data we want to send in a javascript object
    let data = {
        email: emailValue, 
        name: nameValue,
        address: addressValue,
        phone: phoneValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-user-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            nameInput.value = '';
            emailInput.value = '';
            addressInput.value = '';
            phoneInput.value = '';
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
    let currentTable = document.getElementById("userTable");

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
    let nameCell = document.createElement("TD");
    let emailCell = document.createElement("TD");
    let addressCell = document.createElement("TD");
    let phoneCell = document.createElement("TD");

    // Fill the cells with correct data
    //editCell.innerHTML = '<a href="#" onClick="updateUser({{this.userID}})">Edit</a>';
    //delCell.innerHTML = '<a href="#" onclick="deleteUser()">Delete</a>'
    idCell.innerText = newRow.userID;
    nameCell.innerText = newRow.name;
    emailCell.innerText = newRow.email;
    addressCell.innerText = newRow.address;
    phoneCell.innerText = newRow.phone;

    delCell = document.createElement("button");
    delCell.innerHTML = "Delete";
    delCell.onclick = function(){deleteUser(newRow.userID);}
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
    row.appendChild(nameCell);
    row.appendChild(emailCell);
    row.appendChild(addressCell);
    row.appendChild(phoneCell);
    
    row.setAttribute('data-value', newRow.id)
    // Add the row to the table
    currentTable.appendChild(row);

    // Find drop down menu, create a new option, fill data in the option (full name, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("mySelect");
    let option = document.createElement("option");
    option.text = newRow.name;
    option.value = newRow.id;
    selectMenu.add(option);
}