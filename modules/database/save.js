/**
 * Created by dylanturney on 12/10/14.
 */

exports.SaveTransaction = function(TransactionModel, Transaction, callback) {

    if(typeof Transaction.amount == 'undefined' || typeof Transaction.addition == 'undefined') //Server Side Validation
        return callback(false);

    TransactionModel.create(Transaction, function(err, effected, raw){
        if (err) {
            console.log("Error: " + err);
            return callback(false, effected);

        } else {
            console.log("Transaction Saved: " + effected + " raw: " + raw);
            var results = {  //Create new object to not pass Database Data
                amount: effected.amount,
                addition: effected.addition,
                date: effected.date
            };
            return callback(true, results);
        }
    });
};