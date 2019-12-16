module.exports = {
    addToDb,
    deleteFromDB
};

const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});

function addToDb(req, res) {
    const id = req.body.storeid;
    const itemname = req.body.itemname;
    console.log("Info from form: " + id);
    console.log("Info from form: " + itemname);
    const params = [itemname, id];
    const sql = "INSERT INTO groceryItems (item_name, store_id) VALUES ($1, $2)";
    
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


function deleteFromDB(req, res) {
    // const nameStore = req.body.nameStore;
    const params = req.body.item_ids;
    //console.log("Deleting from db", + nameStore);
    console.log("length ", params.length);

    console.log("params part 2, ", params);
    console.log("params length ", params.length);

    const sqlquery = [];
    for(var i = 1; i <= params.length; i++) {
        sqlquery.push('$' + i);
    }
    
    const sql = "DELETE FROM groceryItems where item_id in(" + sqlquery.join(',') + ")";
    console.log(sql);
    
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