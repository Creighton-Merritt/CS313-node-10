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
    const id = req.query.stores;
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

    const sql = "SELECT item_name, store_name FROM stores LEFT JOIN groceryItems ON store_id = id WHERE store_id = $1::int";
	
	const params = [id];

	pool.query(sql, params, function(err, result) {
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			callback(err, null);
		}

		console.log("Found result for store: " + JSON.stringify(result.rows));

		callback(null, result.rows);
	});

}