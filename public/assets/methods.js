module.exports = getList;

function getList(req, res) {
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
