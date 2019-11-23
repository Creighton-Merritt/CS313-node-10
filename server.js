require('dotenv').config();
const path = require('path')
const express = require('express');
const app = express();
const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});
app.set('port', (process.env.PORT || 5000));

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


app.get('/list', getList);
//set up default page to select lists

app.listen(app.get('port'), function() {
    console.log('Node app is running with nodemon on port', app.get('port'));
  });


function getList(req, res) {
    console.log("Getting list information.");

        getListFromDB(function(error, result) {

            if (error || result == null) {
                res.status(500).json({success:false, data: error});
            } else {

                console.log("Back from the database with result: ", result);
                res.render('pages/fullList', {result: 'full_list'});
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

