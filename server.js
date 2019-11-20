require('dotenv').config();
const express = require('express');
const app = express();
const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/getPerson', getPerson);

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
  });

function getPerson(request, response) {
   const id = request.query.id;
        getPersonFromDb(id, function(error, result) {
    
            if (error || result == null || result.length != 1) {
                response.status(500).json({success: false, data: error});
            } else {
                const person = result[0];
                response.status(200).json(person);
            }
        });
}

function getPersonFromDb(id, callback) {
	console.log("Getting person from DB with id: " + id);

	// Set up the SQL that we will use for our query. Note that we can make
	// use of parameter placeholders just like with PHP's PDO.
	const sql = "SELECT id, first, last, birthdate FROM person WHERE id = $1::int";

	// We now set up an array of all the parameters we will pass to fill the
	// placeholder spots we left in the query.
	const params = [id];

	// This runs the query, and then calls the provided anonymous callback function
	// with the results.
	pool.query(sql, params, function(err, result) {
		// If an error occurred...
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			callback(err, null);
		}

		// Log this to the console for debugging purposes.
		console.log("Found result: " + JSON.stringify(result.rows));


		// When someone else called this function, they supplied the function
		// they wanted called when we were all done. Call that function now
		// and pass it the results.

		// (The first parameter is the error variable, so we will pass null.)
		callback(null, result.rows);
	});

} // end of getPersonFromDb


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
