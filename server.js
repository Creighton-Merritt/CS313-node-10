require('dotenv').config();
const path = require('path')
const express = require('express');
const app = express();
const getFullList = (require('./public/fullList.js'));
const getStoreList = (require('./public/lists.js'));
//const bodyParser= require("body-parser");

app.set('port', (process.env.PORT || 5000));
//app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());       
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


app.get('/list', getFullList);
app.get('/stores/:storeId', (req, res) => {
    const stores = req.params.storeId;
    const result = getStoreList.getStoreList(stores);
    console.log("Result from server.js", result);
    res.send(result);
});

app.post('/addToDb', getStoreList.addToDb);
app.get('/', function(req, res) {
    res.render('pages/chooseList')
});

app.listen(app.get('port'), function() {
    console.log('Node app is running with nodemon on port', app.get('port'));
  });

