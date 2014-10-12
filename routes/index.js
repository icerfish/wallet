var express = require('express');
var router = express.Router();
var database = require('../modules/database');
var query = require('../modules/database/query.js')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Wallet' });
});


router.get('/transactions', function(req, res) {
    query.QueryTransactions(database.TransactionModel, function(results){

        if(!results){
            res.send(500);
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(results, null, 3));
        }

    });
});

router.post('/transactions', function(req, res) {
    query.QueryTransactions(database.TransactionModel, function(results){

        if(!results){
            res.send(500);
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(results, null, 3));
        }

    });
});



module.exports = router;
