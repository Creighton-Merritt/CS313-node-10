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
            res.send(result);
        }
    });
}); 

app.post('/addToDb', getStoreList.addToDb);
app.post('/deleteFromDB', getStoreList.deleteFromDB);

app.get('/', function(req, res) {
    res.render('pages/manageList')
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});


//Function called by '/stores' to query database and return list of items for selected store
function getListByStore(id, callback) {
    const sql = "SELECT item_name, store_name, item_id, store_id FROM stores LEFT JOIN groceryitems ON store_id = id WHERE store_id = $1::int";
	
	const params = [id];

	pool.query(sql, params, function(err, result) {
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			callback(err, null);
		}

		callback(null, result.rows);
	});

}

