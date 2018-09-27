var mongoose = require('../db').mongoose;
var schema = new mongoose.Schema({
    name: 'string', // 名称
    type: 'string', // 播放类型
    contents: 'string', // 文件名称
    length: 'string', // 播放时长
    // loop: 'number', // 循环次数
    // effect_entry: 'number',  // 仅图片类型有效
    // effect_exit: 'number', // 仅图片类型有效
    // time_entry: 'string', // 仅图片类型有效
    // time_exit: 'string', // 仅图片类型有效
});
var Media = mongoose.model('Media', schema);
module.exports = Media;