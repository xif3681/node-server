var mongoose = require('../db').mongoose;
var schema = new mongoose.Schema({
    id: { type: String },
    status: { type: String },
    datagram: {
        request: { type: String },
        arguments: { type: Array }
    }

});
var Task = mongoose.model('Task', schema);
module.exports = Task;