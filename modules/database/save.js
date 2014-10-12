/**
 * Created by dylanturney on 12/10/14.
 */

exports.SaveTransaction = function(TransactionModel, Transaction, callback) {

    TransactionModel.create(Transaction, function(err, effected, raw){
        if (err) {
            console.log("Error: " + err);
            callback(false);

        } else {
            console.log("Transaction Saved: " + effected + " raw: " + raw);
            callback(true);
        }
    });
};