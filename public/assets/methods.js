module.exports = getFullList;
module.exports = getStoreList;

const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});

function getFullList(req, res) {
    console.log("Getting list information.");

        getListFromDB(function(error, result) {

            if (error || result == null) {
                res.status(500).json({success:false, data: error});
            } else {

                console.log("Back from the database with result: ", result);
                const params = {result: result};
                res.render('pages/fullList', params);
            }
        });
}

function getListFromDB(callback) {
    console.log("get list back from db");

    var sql = "SELECT item_name, store_name FROM stores LEFT JOIN groceryItems ON store_id = id ORDER BY store_name";

    pool.query(sql, function(error, result) {
        if (error) {
            console.log("Error in query: ")
            console.log(error);
            callback(error, null);
        }

        console.log("Found DB result: " + JSON.stringify(result.rows));

        callback(null, result.rows);
    });

}

function getStoreList(req, res) {
    const id = Number(req.query.stores);
    console.log("Info from form: " + id);
    
    getListByStore(id, function(error, result) {
        if (error || result == null) {
            res.status(500).json({success:false, data: error});
        } else {
            console.log("Back from the database with store result: ", result);
            const params = {result: result};
            res.render('pages/results', params);
        }
    });
}


function getListByStore(id, callback) {
	console.log("Getting list from DB with id: " + id);

	// Set up the SQL that we will use for our query. Note that we can make
    // use of parameter placeholders just like with PHP's PDO.
    const sql = "SELECT item_name, store_name FROM stores LEFT JOIN groceryItems ON store_id = id WHERE store_id = $1::int";
	
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
		console.log("Found result for store: " + JSON.stringify(result.rows));


		// When someone else called this function, they supplied the function
		// they wanted called when we were all done. Call that function now
		// and pass it the results.

		// (The first parameter is the error variable, so we will pass null.)
		callback(null, result.rows);
	});

}