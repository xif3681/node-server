var express = require('express');
// var User = require("../controller/user.js");
var User = require("../model/user.js");
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, resp, next) {
  resp.send({ mess: 'hello lsq first node server'});
});


// 添加用户
router.post('/createUser', function (req, resp, next) {
  console.log(req.body);
  var body = req.body;
  var user = new User(body);
  user.save(function (err, res) {

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

// 获取用户列表
router.get('/getUser', function (req, resp, next) {
  // var query = JSON.stringify(req.query);
  // console.log(query);
  var pageSize = Number(req.query.pageSize) || 5;                   //一页多少条
  var currentPage = Number(req.query.currentPage)  || 1;                //当前第几页

  console.log(pageSize);
  console.log(currentPage);
  // var sort = { 'logindate': -1 };        //排序（按登录时间倒序）
  var condition = {};                 //条件
  var skipnum = (currentPage - 1) * pageSize;   //跳过数

  // var wherestr = {};

  // User.find(condition).skip(skipnum).limit(pageSize).sort(sort).exec(function (err, res) {
  User.find(condition).skip(skipnum).limit(pageSize).exec(function (err, res) {
    if (err) {
      console.log("Error:" + err);
      resp.send({ mess: '获取数据失败！' });
    }
    else {
      console.log("Res:" + res);
      User.count(condition, function (err1, res1) {
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
