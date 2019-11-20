require('dotenv').config();
const express = require('express');
const app = express();
const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});

app.set('port', (process.env.PORT || 5000));

app.get('/getPerson', getPerson);

app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
  });


function getPerson(req, res) {
    console.log("Getting person information.");
    var id = req.query.id;
    console.log("Retrieving person with id: ", id);

        getPersonFromDb(id, function(error, result) {

            if (error || result == null || result.length != 1) {
                res.status(500).json({success:false, data: error});
            } else {

                console.log("Back from the database with result: ", result);
                res.json(result[0]);
            }
        });
}

function getPersonFromDb(id, callback) {
    console.log("getPersonFromDb person from DB with id: " + id);

    var sql = "SELECT id, first_name, last_name, birth_date FROM person WHERE id = $1::int";
    var params = [id];

    pool.query(sql, params, function(error, result) {
        if (error) {
            console.log("Error in query: ")
            console.log(error);
            callback(error, null);
        }

        console.log("Found DB result: " + JSON.stringify(result.rows));

        callback(null, result.rows);
    });

}


// test from activity
// var sql = "SELECT * FROM person";

// function getPerson() {
//     pool.query(sql, function(err, result) {
//     // If an error occured...
//     if(err) {
//         console.log("Error in query: ")
//         console.log(err);
//     }

//     // Log this to the console for debugging purposes.
//     console.log("Back from DB with result: ");
//     console.log(result.rows);
//     result.rows;

// });
// }
