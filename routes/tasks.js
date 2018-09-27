var express = require('express');

var Task = require("../model/task.js");
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, resp, next) {
    resp.send({ mess: 'hello lsq first node server' });
});

router.post('/createTask', function (req, resp, next) {
    console.log(req.body);
    var body = req.body;
    var task = new Task(body);
    task.save(function (err, res) {

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

router.get('/getTask', function (req, resp, next) {
    // var query = JSON.stringify(req.query);
    // console.log(query);
    var pageSize = Number(req.query.pageSize) || 5;                   //一页多少条
    var currentPage = Number(req.query.currentPage) || 1;                //当前第几页

    console.log(pageSize);
    console.log(currentPage);
    // var sort = { 'logindate': -1 };        //排序（按登录时间倒序）
    var condition = {};                 //条件
    var skipnum = (currentPage - 1) * pageSize;   //跳过数

    // var wherestr = {};

    // User.find(condition).skip(skipnum).limit(pageSize).sort(sort).exec(function (err, res) {
    Task.find(condition).skip(skipnum).limit(pageSize).exec(function (err, res) {
        if (err) {
            console.log("Error:" + err);
            resp.send({ mess: '获取数据失败！' });
        }
        else {
            console.log("Res:" + res);
            Task.count(condition, function (err1, res1) {
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