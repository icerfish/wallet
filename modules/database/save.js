/**
 * Created by dylanturney on 12/10/14.
 */

exports.SaveTransaction = function(TransactionModel, Transaction, callback) {

    if(typeof Transaction.amount == 'undefined' || typeof Transaction.addition == 'undefined') //Server Side Validation
        return callback(false);

    TransactionModel.create(Transaction, function(err, effected, raw){
        if (err) {
            console.log("Error: " + err);
            return callback(false);

        } else {
            console.log("Transaction Saved: " + effected + " raw: " + raw);
            return callback(true);
        }
    });
};