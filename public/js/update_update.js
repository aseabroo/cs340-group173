// Get the objects we need to modify
let updateUserForm = document.getElementById('update-update-form-ajax');

// Modify the objects we need
updateUserForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputID = document.getElementById("upSelect");
    let inputVersion = document.getElementById("upVersionInput");
    let inputRelDate = document.getElementById("relDateInput");
    let inputUpSize = document.getElementById("upSizeInput")
    let inputStatus = document.getElementById("upStatusInput");

    let idValue = inputID.value;
    let versionValue = inputVersion.value;
    let relDateValue = inputRelDate.value;
    let upSizeValue = inputUpSize.value;
    let statusValue = inputStatus.value;

    /*
    if(versionValue = '') {
        versionValue = null;
    }
 */
    // Put our data we want to send in a javascript object
    let data = {
        updateID: idValue,
        updateVersion: versionValue,
        releaseDate:relDateValue,
        updateSize:upSizeValue,
        status: statusValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-update-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateUpRow(xhttp.response, idValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateUpRow(data, name){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("updateTable");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == name) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            let tdVersion = updateRowIndex.getElementsByTagName("td")[3];
            let tdRelease = updateRowIndex.getElementsByTagName("td")[4];
            let tdSize = updateRowIndex.getElementsByTagName("td")[5];
            let tdStatus = updateRowIndex.getElementsByTagName("td")[6];

            // Reassign homeworld to our value we updated to
            tdVersion.innerHTML = parsedData[0].updateVersion;
            tdRelease.innerHTML = parsedData[0].releaseDate;
            tdSize.innerHTML = parsedData[0].updateSize;
            tdStatus.innerHTML = parsedData[0].status; 
       }
    }
}