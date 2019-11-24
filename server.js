require('dotenv').config();
const path = require('path')
const express = require('express');
const app = express();
const getFullList = (require('./public/assets/methods.js'));

app.set('port', (process.env.PORT || 5000));

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', function(req, res) {
    res.render('pages/chooseList')
});

app.get('/list', getFullList);
app.get('/stores', getStoreList);

app.listen(app.get('port'), function() {
    console.log('Node app is running with nodemon on port', app.get('port'));
  });



