var mongoose = require('../db').mongoose;
var schema = new mongoose.Schema({
    id: { type: String },
    name: { type: String },
    x: { type: String },
    y: { type: String },
    width: { type: Number },
    height: { type: Number },
    items: { type: Array }

});
var Region = mongoose.model('Region', schema);
module.exports = Region;