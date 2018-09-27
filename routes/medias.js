var express = require('express');
var router = express.Router();
var Media = require("../model/media.js");

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

// 添加播放内容
router.post('/createMedia', function (req, resp, next) {
    console.log(req.body);
    var body = req.body;
    var media = new Media(body);
    media.save(function (err, res) {

        if (err) {
            console.log("Error:" + err);
            resp.send({ mess: '添加失败！' });
        }
        else {
            console.log("Res:" + res);
            resp.send({ mess: '添加成功！' });
        }

    });


});

// 获取播放内容
router.get('/getMedia', function (req, resp, next) {

    var pageSize = Number(req.query.pageSize) || 5;                   //一页多少条
    var currentPage = Number(req.query.currentPage) || 1;                //当前第几页
    var condition = {};                 //条件
    var skipnum = (currentPage - 1) * pageSize;   //跳过数
    Media.find(condition).skip(skipnum).limit(pageSize).exec(function (err, res) {
        if (err) {
            console.log("Error:" + err);
            resp.send({ mess: '获取数据失败！' });
        }
        else {
            console.log("Res:" + res);
            Media.count(condition, function (err1, res1) {
                if (err) {
                    console.log("Error:" + err1);
                }
                else {
                    console.log("Res:" + res1);
                    resp.send({ mess: '获取数据成功！', data: res, total: res1 });
                }
            })

        }
    })


});


module.exports = router;
