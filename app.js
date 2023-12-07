/*
    SETUP
*/

// Express
PORT        = 8081;
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

// Database
var db = require('./database/db-connector')
                    
// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

/*
    ROUTES
*/

// app.js - ROUTES section


app.get('/', function(req, res)
    {
        let query1 = 'SELECT * FROM Appliances'
        db.pool.query(query1, function(error, rows, fields){
            res.render('index', {data: rows});
        })
    });   

/*---------------------------------------------------------------------------------------
Implementation of Users page
---------------------------------------------------------------------------------------*/

app.get('/users', function(req,res) {
    let usersDisplay = `SELECT * FROM Users;`;

    db.pool.query(usersDisplay, function(error, rows, feilds) {
        res.render('users', {usersData: rows})
    })
});

app.post('/add-user-ajax', function(req,res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let phone = parseInt(data.phone);
    if (isNaN(phone))
    {
        phone = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Users (email, name, address, phone) VALUES ( '${data.email}', '${data.name}', '${data.address}', '${data.phone}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Users;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.delete('/delete-user-ajax', function(req,res,next){
    let data = req.body;
    let userID = parseInt(data.id);
    let deleteUser = `DELETE FROM Users WHERE userID = ?`;
  
          // Run the 1st query
          db.pool.query(deleteUser, [userID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              } else {
                res.sendStatus(204);
            }
              
  })});

  app.put('/put-user-ajax', function(req,res,next){
    let data = req.body;
  

    let name = parseInt(data.name);
    let email = parseInt(data.email);
    let address = parseInt(data.address);
    let phone = parseInt(data.phone);
  
    let updateUserQuery = `UPDATE Users SET email = ?, address = ?, phone = ? WHERE userID = ?`
  
          // Run the 1st query
          db.pool.query(updateUserQuery, [email, address, phone, name], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);

            } else {
                res.send(rows);
            }
  })});

/*---------------------------------------------------------------------------------------
Implementation of OTA_Updates page
---------------------------------------------------------------------------------------*/

app.get('/ota_updates', function(req,res) {
    let updatesDisplay = `SELECT * FROM OTA_Updates;`;

    db.pool.query(updatesDisplay, function(error, rows, feilds) {
        res.render('ota_updates', {updatesData: rows})
    })
});

app.post('/add-updates-ajax', function(req,res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let updateVersion = parseInt(data.updateVersion);
    if (isNaN(updateVersion))
    {
        updateVersion = 'NULL'
    }

    let releaseDate = parseInt(data.releaseDate);
    if (isNaN(releaseDate))
    {
        releaseDate = 'NULL'
    }

    let updateSize = parseInt(data.updateSize);
    if (isNaN(updateSize))
    {
        updateSize = 'NULL'
    }

    let status = parseInt(data.status); 
    if (isNaN(status))
    {
        status = 'NULL'
    }



    // Create the query and run it on the database
    query1 = `INSERT INTO OTA_Updates (updateVersion, releaseDate, updateSize, status) VALUES ('${data.updateVersion}', '${data.releaseData}', '${data.updateSize}', '${data.status}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT *
            query2 = `SELECT * FROM OTA_Updates;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.delete('/delete-update-ajax', function(req,res,next){
    let data = req.body;
    let updateID = parseInt(data.id);
    let deleteUpdate = `DELETE FROM OTA_Updates WHERE updateID = ?`;
  
          // Run the 1st query
          db.pool.query(deleteUpdate, [updateID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              } else {
                res.sendStatus(204);
            }
              
  })});

  app.put('/put-update-ajax', function(req,res,next){
    let data = req.body;
  
    let updateID = parseint(data.updateID);
    let updateVersion = parseInt(data.updateVersion);
    let releaseDate = parseInt(data.releaseDate);
    let updateSize = parseInt(data.updateSize);
    let status = parseInt(data.status);
  
    let updateUpdateQuery = `UPDATE OTA_Updates SET updateVersion=?, releaseDate=?, updateSize= ?, status= ? WHERE updateID= ?`
  
          // Run the 1st query
          db.pool.query(updateUpdateQuery, [updateVersion, releaseDate, updateSize, status, updateID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);

            } else {
                res.send(rows);
            }
  })});


/*---------------------------------------------------------------------------------------
Implementation of customerServices page
---------------------------------------------------------------------------------------*/

app.get('/customerservices', function(req,res) {
    let csDisplay = `SELECT * FROM CustomerServices;`;
    let usersDisplay = `SELECT * FROM Users;`;
    let appliancesDisplay = `SELECT * FROM Appliances;`;

    db.pool.query(csDisplay, function(error, rows, feilds) {
        db.pool.query(usersDisplay, function(error, rows, feilds) {
            db.pool.query(appliancesDisplay, function(error, rows, feilds) {
                res.render('customerServices', {csData: rows,usersData: rows,appliancesData: rows})
            })
        })
    })
/*
    db.pool.query(usersDisplay, function(error, rows, feilds) {
        res.render('users', {usersData: rows})
    })

    db.pool.query(appliancesDisplay, function(error, rows, feilds) {
        res.render('users', {appliancesData: rows})
    })
*/
});

app.post('/add-customerService-ajax', function(req,res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let appID = parseInt(data.applianceID);
    if (isNaN(appID))
    {
        appID = 'NULL'
    }

    // Create the query and run it on the database
    if(data.applianceID) {
        query4 =`INSERT INTO CustomerServices (userID, issueDescription, resolutionStatus, dateReported, applianceID) VALUES ('SELECT FROM Users userID WHERE userID =${data.userID}', '${data.issueDescription}', '${data.resolutionStatus}', '${data.dateReported}', 'SELECT FROM Appliances applianceID WHERE applianceID =${data.applianceID}');`
    } else {
        query4 =`INSERT INTO CustomerServices (userID, issueDescription, resolutionStatus, dateReported, applianceID) VALUES ('SELECT FROM Users userID WHERE userID =${data.userID}', '${data.issueDescription}', '${data.resolutionStatus}', '${data.dateReported}', 'SELECT FROM Appliances applianceID WHERE applianceID =${NULL}');`
    }
    db.pool.query(query4, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT *
            query2 = `SELECT * FROM CustomerServices;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});



app.delete('/delete-customerService-ajax', function(req,res,next){
    let data = req.body;
    let serviceID = parseInt(data.id);
    let deleteService = `DELETE FROM CustomerServices WHERE serviceID= ?;`;
  
          // Run the 1st query
          db.pool.query(deleteService, [serviceID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              } else {
                res.sendStatus(204);
            }
              
  })});

/*---------------------------------------------------------------------------------------
Implementation of Appliances page
---------------------------------------------------------------------------------------*/

app.post('/add-appliance-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let lastUpdated = parseInt(data.lastUpdated);
    if (isNaN(lastUpdated))
    {
        lastUpdated = 'NULL'
    }

    let userID = parseInt(data.userID);
    if (isNaN(userID))
    {
        userID = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Appliances (model, datePurchased, lastUpdated, userID) VALUES ('${data.model}', '${data.datePurchased}', ${lastUpdated}, ${userID})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Appliances;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});



/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});

