require('dotenv').config();
const path = require('path')
const express = require('express');
const app = express();
const getFullList = (require('/fullList.js'));
const getStoreList = (require('/lists.js'));
//const bodyParser= require("body-parser");

app.set('port', (process.env.PORT || 5000));
//app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());       
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


app.get('/list', getFullList);
app.get('/stores', getStoreList.getStoreList);
app.post('/addToDb', getStoreList.addToDb);
app.get('/', function(req, res) {
    res.render('pages/chooseList')
});

app.listen(app.get('port'), function() {
    console.log('Node app is running with nodemon on port', app.get('port'));
  });

