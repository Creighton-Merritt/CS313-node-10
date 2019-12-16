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
            const requestURL = 'stores/' + id;
            console.log("Request url", requestURL);
            $.ajax({
                url: requestURL,
                type: 'GET',
                dataType: 'json',
                success: (result) => {
                    $('#tableBody').html("");
                    $('#storeName').html(result[0].store_name);
                    console.log('ajax success!', result);
                    for (i=0 ; i < result.length ; i++) {
                        var num = (i + 1);
                        $('#tableBody').append('<tr><th scope="row">' + num + '</th><td class="text-left">' + result[i].item_name + 
                        '</td><td><input type="checkbox" class="checkitem" value="' + result[i].item_id + '"></td></tr>');
                    }
                    
                    $('#stores').prop('selectedIndex', null);
                    $('#hiddenStoreId').attr("value", result[0].store_id);
                    $('#adding').css("visibility", "visible");
                }
            });
        }
    });

}


function deleteFromDB(req, res) {
    const params = req.body.item_ids;
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