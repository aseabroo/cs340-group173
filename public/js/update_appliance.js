// Get the objects we need to modify
let updateApplianceForm = document.getElementById('update-appliance-form-ajax');

// Modify the objects we need
updateApplianceForm.addEventListener("submit", function (e) {
    console.log('submit working');
    // Prevent the form from submitting
    e.preventDefault();

      // Get form fields we need to get data from
      let inputApplianceID = document.getElementById("applianceIDSelect");
      let inputModel = document.getElementById("input-modelUpdate");
      let inputDatePurchased = document.getElementById("input-datePurchasedUpdate");
      let inputLastUpdated = document.getElementById("input-lastUpdatedUpdate");
      let inputUserID = document.getElementById("input-userIDUpdate");
     
      // Get the values from the form fields
      let applianceIDValue = inputApplianceID.value;
      let modelValue = inputModel.value;
      let datePurchasedValue = inputDatePurchased.value;
      let lastUpdatedValue = inputLastUpdated.value;
      let userIDValue = inputUserID.value;

    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld
  
    // Put our data we want to send in a javascript object
    let data = {
        applianceID: applianceIDValue,
        model: modelValue,
        datePurchased : datePurchasedValue,
        lastUpdated: lastUpdatedValue,
        userID: userIDValue
    }
 
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-appliance-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, applianceIDValue);
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


function updateRow(data, applianceID){
    let parsedData = JSON.parse(data);
    console.log("correctly sends data");
    let table = document.getElementById("applianceTable");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == applianceID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            let tdModel = updateRowIndex.getElementsByTagName("td")[3];
            let tdDatePurchased = updateRowIndex.getElementsByTagName("td")[4];
            let tdLastUpdated = updateRowIndex.getElementsByTagName("td")[5];
            let tdUserID = updateRowIndex.getElementsByTagName("td")[6];
            //need to do it for 4-6
            // Reassign homeworld to our value we updated to
            tdModel.innerHTML = parsedData[0].model; 
            tdDatePurchased.innerHTML = parsedData[0].datePurchased;
            tdLastUpdated.innerHTML = parsedData[0].lastUpdated;
            tdUserID.innerHTML = parsedData[0].userID
       }
    }
}