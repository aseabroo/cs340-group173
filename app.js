/*
    SETUP
*/

// Express
PORT        = 9998;
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

