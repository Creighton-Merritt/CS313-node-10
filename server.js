require('dotenv').config();
const path = require('path')
const express = require('express');
const app = express();
const getFullList = (require('./public/fullList.js'));
const addToDb = (require('./public/lists.js'));
const getListByStore = (require('./public/lists.js'));
//const bodyParser= require("body-parser");
const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});


app.set('port', (process.env.PORT || 5000));
//app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());       
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


app.get('/list', getFullList);
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

app.post('/addToDb', addToDb);
app.get('/', function(req, res) {
    res.render('pages/chooseList')
});

app.listen(app.get('port'), function() {
    console.log('Node app is running with nodemon on port', app.get('port'));
  });


