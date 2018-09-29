var express = require('express');
// var Program = require("../controller/Program.js");
var Program = require("../model/program.js");
var router = express.Router();

/* GET Programs listing. */
router.get('/', function (req, resp, next) {
    resp.send({ mess: 'hello lsq first node server' });
});


// 添加节目
router.post('/createProgram', function (req, resp, next) {
    console.log(req.body);
    var body = req.body;
    var program = new Program(body);
    program.save(function (err, res) {

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

router.get('/getProgram', function (req, resp, next) {

    var id = req.query.id;
    Program.findById(id, function (err, res) {
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
            // let  program = {
            //     id: res._id,
            //     name: res.name,
            //     length: res.length,
            //     width: res.width,
            //     height: res.height,
            //     regions: res.regions

            // }
            let programs = [
                {
                    id: res._id,
                    name: res.name,
                    length: res.length,
                    width: res.width,
                    height: res.height,
                    regions: res.regions

                }
            ]
            let result = {
                'policy': 'simple',
                'programs': programs
            };
            resp.send(result);
        }
    })



});

// 获取节目列表
router.get('/getPrograms', function (req, resp, next) {
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

    // Program.find(condition).skip(skipnum).limit(pageSize).sort(sort).exec(function (err, res) {
    Program.find(condition).skip(skipnum).limit(pageSize).exec(function (err, res) {
        if (err) {
            console.log("Error:" + err);
            resp.send({ mess: '获取数据失败！' });
        }
        else {
            console.log("Res:" + res);
            Program.count(condition, function (err1, res1) {
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
