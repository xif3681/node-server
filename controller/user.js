var User = require("../model/user.js");

/**
 * 插入
 */
function insert(body) {
    var user = new User(body);

    // var user = new User({
    //     username: 'Tracy McGrady',                 //用户账号
    //     userpwd: 'abcd',                            //密码
    //     userage: 37,                                //年龄
    //     logindate: new Date()                      //最近登录时间
    // });

    user.save(function (err, res) {

        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }

    });
}

// insert();

function update(wherestr, updatestr) {
    // var wherestr = { 'username': 'Tracy McGrady' };
    // var updatestr = { 'userpwd': 'zzzz' };

    User.update(wherestr, updatestr, { multi: true}, function (err, res) {
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
}

// update();

function del(wherestr) {
    // var wherestr = { 'username': 'Tracy McGrady' };

    User.remove(wherestr, function (err, res) {
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
}

// del();

function getByConditions(wherestr) {
    // var wherestr = { 'username': 'Tracy McGrady' };

    User.find(wherestr, function (err, res) {
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
}

// getByConditions();

function getById() {
    var id = '56f261fb448779caa359cb73';

    User.findById(id, function (err, res) {
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
}

// getById();

function getCountByConditions(wherestr) {
    // var wherestr = {};

    User.count(wherestr, function (err, res) {
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
}
// getCountByConditions();

function getByPager(pageSize, currentPage) {

    // var pageSize = 5;                   //一页多少条
    // var currentPage = 1;                //当前第几页
    var sort = { 'logindate': -1 };        //排序（按登录时间倒序）
    var condition = {};                 //条件
    var skipnum = (currentPage - 1) * pageSize;   //跳过数

    User.find(condition).skip(skipnum).limit(pageSize).sort(sort).exec(function (err, res) {
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
}

// getByPager();