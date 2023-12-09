// ./database/db-connector.js

// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
// TO DO , make a function to have host,user,pw,database be interchangable
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_pruittan',
    password        : '8912',
    database        : 'cs340_pruittan'
})

// Export it for use in our applicaiton
module.exports.pool = pool;