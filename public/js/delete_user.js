/**
 * JavaScript for handling  deletion and updating the table.
 *
 * Citation:
 * Function Description: JavaScript code for handling the deletion via AJAX request and dynamically updating the table.
 * Date: 12/11/2023
 * Originality: Adapted and refactored for specific use in an appliance management application. The structure and logic have been modified for the specific requirements of the application.
 * Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/blob/main/Step%208%20-%20Dynamically%20Updating%20Data/public/js/delete_person.js
 */
function deleteUser(userID) {
  // Put our data we want to send in a javascript object
  let data = {
      id: userID
  };

  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", "/delete-user-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // Tell our AJAX request how to resolve
  xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4 && xhttp.status == 204) {

          // Add the new data to the table
          deleteRow(userID);

      }
      else if (xhttp.readyState == 4 && xhttp.status != 204) {
          console.log("There was an error with the input.")
      }
  }
  // Send the request and wait for the response
  xhttp.send(JSON.stringify(data));
}


function deleteRow(userID){

  let table = document.getElementById("userTable");
  for (let i = 0, row; row = table.rows[i]; i++) {
     //iterate through rows
     //rows would be accessed using the "row" variable assigned in the for loop
     if (table.rows[i].getAttribute("data-value") == userID) {
          table.deleteRow(i);
          break;
     }
  }
}