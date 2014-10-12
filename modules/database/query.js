/**
 * Created by dylanturney on 12/10/14.
 */

exports.QueryTransactions = function(TranactionModel, callback) {

    TranactionModel
        .find()
        .exec(function (err, results) {

            if (err){
                console.log("There was an error: " + err);
                callback(false);
            } else {
                callback(results);
            }
        });
};