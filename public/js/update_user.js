// Get the objects we need to modify
let updateUserForm = document.getElementById('update-user-form-ajax');

// Modify the objects we need
updateUserForm.addEventListener("submit", function (e) {
   
    console.log("submit working");
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputID = document.getElementById("mySelect");
    let inputEmail = document.getElementById("emailUpdateInput");
    let inputAddress = document.getElementById("addressUpdateInput");
    let inputPhone = document.getElementById("phoneUpdateInput");

    let IDValue = inputID.value;
    let emailValue = inputEmail.value;
    let addressValue = inputAddress.value;
    let phoneValue = inputPhone.value;
    
    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld
    console.log(emailValue);
    console.log(addressValue);
    console.log(phoneValue);
    if (emailValue == ''|| addressValue == '') 
    {
        console.log("returns due to negative inputs");
        return;
    }
    if(isNaN(phoneValue)) {
        return;
    }


    // Put our data we want to send in a javascript object
    let data = {
        id: IDValue,
        email:emailValue,
        address: addressValue,
        phone: phoneValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-user-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, IDValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, name){
    let parsedData = JSON.parse(data);
    console.log("correctly sends data");
    let table = document.getElementById("userTable");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == name) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            let tdEmail = updateRowIndex.getElementsByTagName("td")[4];
            let tdAddress = updateRowIndex.getElementsByTagName("td")[5];
            let tdPhone = updateRowIndex.getElementsByTagName("td")[6];
            //need to do it for 4-6
            // Reassign homeworld to our value we updated to
            tdEmail.innerHTML = parsedData[0].email; 
            tdAddress.innerHTML = parsedData[0].address;
            tdPhone.innerHTML = parsedData[0].phone;
       }
    }
}