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
    const item_ids = req.body.item_ids;
    //console.log("Deleting from db", + nameStore);
    console.log("length ", item_ids.length)
    const params = [];
    for(var i = 1; i <= item_ids.length; i++) {
        params.push('$' + i);
    }

    console.log("params to delete", params);
    const sql = "DELETE FROM groceryItems where item_id in(" + params + ")";
    
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