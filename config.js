/**
 * Created by dylanturney on 12/10/14.
 */

module.exports = {

    "db": {
        "mongodb": "mongodb://work-angel:test@ds041160.mongolab.com:41160/work-angel-test",
        "options": {
            server:{
                auto_reconnect: true,
                poolSize: 10,
                socketOptions:{
                    keepAlive: 1
                }
            },
            db: {
                numberOfRetries: 10,
                retryMiliSeconds: 1000,
                safe:false
            }
        }

    }
};