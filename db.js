var settings = require("./settings");
var mongoose = require('mongoose');
var DB_URL = "mongodb://" + settings.ip + "/" + settings.db;

/**
 * 连接
 */
// mongoose.connect(DB_URL);

mongoose.connect("mongodb://" + settings.ip + "/" + settings.db);
var db = mongoose.connection;


/**
  * 连接成功
  */
mongoose.connection.on('connected', function () {
    console.log('Mongoose connection open to ' + DB_URL);
});

/**
 * 连接异常
 */
mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
}); 

// module.exports = mongoose;//导出mongoose对象　　

module.exports = {
    "dbCon": db,
    "mongoose": mongoose
};