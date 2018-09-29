var mongoose = require('../db').mongoose;
var schema = new mongoose.Schema({
    name: { type: String },
    length: { type: String },
    width: { type: Number },
    height: { type: Number },
    regions: { type: Array }

});
var Program = mongoose.model('Program', schema);
module.exports = Program;