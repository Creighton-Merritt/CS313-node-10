module.exports = {
    getStoreList,
    addToDb
};

const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});

// function getStoreList(req, res) {
//     const id = req.body.storeid;
//     console.log("Info from form: " + id);
    
//     getListByStore(id, function(error, result) {
//         if (error || result == null) {
//             res.status(500).json({success:false, data: error});
//         } else {
//             console.log("Back from the database with store result: ", result);
//             const store_id = result[0].store_id;
//             console.log("Store id: " + store_id);
//             console.log("testing new params json", result);
//             return res.json(result);
//         }
//     });
// }


// function getStoreList(id, callback) {
// 	console.log("Getting list from DB with id: " + id);

//     const sql = "SELECT item_name, store_name, store_id FROM stores LEFT JOIN groceryItems ON store_id = id WHERE store_id = $1::int";
	
// 	const params = [id];

// 	pool.query(sql, params, function(err, result) {
// 		if (err) {
// 			console.log("Error in query: ")
// 			console.log(err);
// 			callback(err, null);
// 		}

// 		console.log("Found result for store: " + JSON.stringify(result.rows));

// 		callback(null, result.rows);
// 	});

// }

function getStoreList(req, res, next) {
    const storeId = req.body.storeid;

    const sql = "SELECT item_name, store_name, store_id FROM stores LEFT JOIN groceryItems ON store_id = id WHERE store_id = $1::int";
	
    const params = [storeId];
    console.log("Info from form: " + storeId);

	pool.query(sql, params, function(err, result) {
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			return next(err);
		}
		console.log("Found result for store: " + JSON.stringify(result.rows));
		res.json(result.rows);
	});

}

function addToDb(req, res) {
    const id = req.body.storeid;
    const itemname = req.body.itemname;
    console.log("Info from form: " + id);
    console.log("Info from form: " + itemname);
    const params = [itemname, id];
    const sql = "INSERT INTO groceryItems (item_name, store_id) VALUES ($1, $2)";
    
    var result = {success: false};
    pool.query(sql, params, function(err, result) {
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        } else {
            result = {success: true};
            res.json(result);
        }
    });

}