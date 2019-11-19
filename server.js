require('dotenv').config();
const express = require('express');
const app = express();
const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});
var sql = "SELECT * FROM.person";

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/getPerson', getPerson);

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
  });


function getPerson(req, res) {

    var person_id = request.query.id;

	getPersonFromDb(id, function(err, res) {

		if (err || res == null || res.length != 1) {
			res.status(500).json({success: false, data: err});
		} else {
			const person = result[0];
			res.status(200).json(person);
		}
	});
}

function getPersonFromDb(id, callback) {
	console.log("Getting person from DB with id: " + id);

	const sql = "SELECT id, first_name, last_name, birth_date FROM person WHERE id = $1::int";

	const params = [id];

	pool.query(sql, params, function(err, res) {
		// If an error occurred...
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			callback(err, null);
		}

		// Log this to the console for debugging purposes.
		console.log("Found result: " + JSON.stringify(res.rows));

		callback(null, result.rows);
	});

}

// pool.query(sql, function(err, result) {
//     // If an error occured...
//     if(err) {
//         console.log("Error in query: ")
//         console.log(err);
//     }

//     // Log this to the console for debugging purposes.
//     console.log("Back from DB with result: ");
//     console.log(result.rows);

// });

