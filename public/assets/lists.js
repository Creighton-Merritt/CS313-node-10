module.exports = {
    getStoreList,
    addToDb
};

const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});

function getStoreList(req, res) {
    const id = req.query.stores;
    console.log("Info from form: " + id);
    
    getListByStore(id, function(error, result) {
        if (error || result == null) {
            res.status(500).json({success:false, data: error});
        } else {
            console.log("Back from the database with store result: ", result);
            const store_id = result[0].store_id;
            console.log("Store id: " + store_id);
            const params = {result: result, store_id: store_id};
            res.render('pages/results', params);
        }
    });
}


function addToDb(req, res) {
    const id = req.body.store;
    const itemName = req.body.itemName;
    console.log("Info from form: " + id);
    console.log("Info from form: " + itemName);
    const params = [itemName, id];
    const sql = "INSERT INTO groceryItems (item_name, store_id) VALUES ($1, $2)";
    
    pool.query(sql, params, function(err, result) {
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        } else {
            console.log("Successfully added to database");
            console.log("Params", params);
            getListByStore(id, function(error, result) {
                if (error || result == null) {
                    res.status(500).json({success:false, data: error});
                } else {
                    console.log("Back from the database with store result: ", result);
                    const store_id = result[0].store_id;
                    console.log("Store id: " + store_id);
                    const params = {result: result, store_id: store_id};
                    res.render('pages/results', params);
                }
            });
        }
    });

}


function getListByStore(id, callback) {
	console.log("Getting list from DB with id: " + id);

    const sql = "SELECT item_name, store_name, store_id FROM stores LEFT JOIN groceryItems ON store_id = id WHERE store_id = $1::int";
	
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
