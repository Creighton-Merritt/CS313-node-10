require('dotenv').config();

const express = require('express');
const app = express();
const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});
var sql = "SELECT * FROM.person";

pool.query(sql, function(err, result) {
    // If an error occured...
    if(err) {
        console.log("Error in query: ")
        console.log(err);
    }

    // Log this to the console for debugging purposes.
    console.log("Back from DB with result: ");
    console.log(result.rows);

});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
  });