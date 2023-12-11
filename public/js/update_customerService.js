// Get the objects we need to modify
let updateUserForm = document.getElementById('update-services-form-ajax');

// Modify the objects we need
updateUserForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputID = document.getElementById("serIDSelect");
    let inputStatus = document.getElementById("csUpStatus");

    let idValue = inputID.value;
    let statusValue = inputStatus.value;

    if(versionValue = '') {
        versionValue = null;
    }
 
    // Put our data we want to send in a javascript object
    let data = {
        serviceID: idValue,
        status: statusValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-customerService-ajax", true);
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
    
    let table = document.getElementById("csTable");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == name) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            let tdService = updateRowIndex.getElementsByTagName("td")[2];
            let tdUser = updateRowIndex.getElementsByTagName("td")[3];
            let tdAppliance = updateRowIndex.getElementsByTagName("td")[4];
            let tdDescription = updateRowIndex.getElementsByTagName("td")[5];
            let tdDate = updateRowIndex.getElementsByTagName("td")[6];
            let tdStatus = updateRowIndex.getElementsByTagName("td")[7];

            tdService.innerHTML = parsedData[0].serviceID;
            tdUser.innerHTML = parsedData[0].userID;
            tdAppliance.innerHTML = parsedData[0].applianceID;
            tdDescription.innerHTML = parsedData[0].issueDescription;
            tdDate.innerHTML = parsedData[0].dateReported;
            tdStatus.innerHTML = parsedData[0].resolutionStatus;
  
       }
    }
}