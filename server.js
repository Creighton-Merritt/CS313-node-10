require('dotenv').config();
const path = require('path')
const express = require('express');
const app = express();
const getStoreList = (require('./public/lists.js'));

const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});


app.set('port', (process.env.PORT || 5000));
app.use(express.json());       
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/stores/:storeId', (req, res) => {
    const id = req.params.storeId;
    
    getListByStore(id, function(error, result) {
        if (error || result == null) {
            res.status(500).json({success:false, data: error});
        } else {
            console.log("Back from the database with store result: ", result);
            res.send(result);
        }
    });
});

app.post('/addToDb', getStoreList.addToDb);


app.get('/', function(req, res) {
    res.render('pages/manageList')
});

app.listen(app.get('port'), function() {
    console.log('Node app is running with nodemon on port', app.get('port'));
  });


//Functions to query database

function getListByStore(id, callback) {
	console.log("Getting list from DB with id: " + id);

    const sql = "SELECT item_name, store_name, item_id, store_id FROM stores LEFT JOIN groceryItems ON store_id = id WHERE store_id = $1::int";
	
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