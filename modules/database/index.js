/**
 * Created by dylanturney on 12/10/14.
 */

var mongoose = require('mongoose');
var config = require('../../config');

var db = mongoose.createConnection(config.db.mongodb, config.db.options);

db.on('open', function (ref) {
    console.log('Connected to Mongo Server.');
});

db.on('error', function (err) {
    console.log('Could not connect to Mongo Server!');
    console.log(err);
    console.log('Database Readystate: '+ db.readyState);

});

db.on('reconnected', function () {
    console.log('Mongo Server reconnected!');
});

db.on('disconnected', function() {
    console.log('Mongo Server disconnected!');
    mongoose.createConnection(config.db.mongodb, config.db.options);
});

var Schema = mongoose.Schema;

exports.TransactionModel = db.model('Transaction', new Schema({
    amount: Number,     //Quanity of transaction
    addition: Boolean,  //True is an addition, False is a subtraction
    date: { type: Date, default: Date.now }
}));

