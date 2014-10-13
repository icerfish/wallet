var express = require('express');
var router = express.Router();
var database = require('../modules/database');
var query = require('../modules/database/query.js');
var save = require('../modules/database/save.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Wallet' }); //Render index
});


router.get('/transactions/all', function(req, res) {
    query.QueryTransactions(database.TransactionModel, function(results){

        if(!results){
            res.send(500); //Returns 500 if error querying Mongo occurs
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(results, null, 3));
        }

    });
});

router.post('/transactions/add', function(req, res) {
    save.SaveTransaction(database.TransactionModel, req.body, function (success, results) {
        if (!success)
            res.send(500); //Returns 500 if error adding to Mongo occurs
        else {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(results, null, 3));

        }

    });
});

router.get('/transactions/reset', function(req, res){
    database.TransactionModel.remove({}, function(err) { //Remove all documents in collection
        res.redirect('/'); //Redirect user to home
    });
});



module.exports = router;
