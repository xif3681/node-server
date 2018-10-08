var express = require('express');

var Task = require("../model/task.js");
var router = express.Router();

/* GET Tasks listing. */
router.get('/', function (req, resp, next) {
    resp.send({ mess: 'hello lsq first node server' });
});

// 创建任务
router.post('/createTask', function (req, resp, next) {
    // console.log(req.body);
    var body = req.body;
    var task = new Task(body);
    task.save(function (err, res) {

        if (err) {
            console.log("Error:" + err);
            resp.send({ mess: '服务器错误！', data: { 'server_time': new Date(), err: err } });
        }
        else {
            console.log("Res:" + 'createTask');
            resp.send({ mess: '添加成功！' });
        }

    });


});

// 分页获取任务
router.get('/getTasks', function (req, resp, next) {
    // var query = JSON.stringify(req.query);
    // console.log(query);
    var pageSize = Number(req.query.pageSize) || 5;                   //一页多少条
    var currentPage = Number(req.query.currentPage) || 1;                //当前第几页

    // var sort = { 'logindate': -1 };        //排序（按登录时间倒序）
    var sort = { 'id': 1 };        //排序（按登录时间倒序）
    var condition = {};                 //条件
    var skipnum = (currentPage - 1) * pageSize;   //跳过数

    // var wherestr = {};

    Task.find(condition).skip(skipnum).limit(pageSize).sort(sort).exec(function (err, res) {
    // Task.find(condition).skip(skipnum).limit(pageSize).exec(function (err, res) {
        if (err) {
            console.log("Error:" + err);
            resp.send({ mess: '服务器错误！', data: { 'server_time': new Date(), err: err } });
        }
        else {
            console.log("Res:" + 'getTask');
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

router.get('/searchAllTask', function (req, resp, next) {
    var id = Number(req.query.id) || 'DE1700220125';
    var pageSize = Number(req.query.pageSize) || 5;                   //一页多少条
    var currentPage = Number(req.query.currentPage) || 1;                //当前第几页
    // var sort = { 'id': 1 };        //排序（按登录时间倒序）
    var condition = {'id': id};                 //条件
    var skipnum = (currentPage - 1) * pageSize;   //跳过数

    // Task.find(condition).skip(skipnum).limit(pageSize).sort(sort).exec(function (err, res) {
        Task.find(condition).skip(skipnum).limit(pageSize).exec(function (err, res) {
        if (err) {
            console.log("Error:" + err);
            resp.send({ mess: '服务器错误！', data: { 'server_time': new Date(), err: err } });
        }
        else {
            console.log("Res:" + 'searchAllTask');
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
router.post('/searchTask', function (req, resp, next) {
    var content = req.body;
    // var content = JSON.parse(body.content);
    console.log(content);

    if (!content.task || content.task.length == 0) { // 服务器下发任务！
        var led_id = content.system_info.id;
        console.log('服务器下发任务！');
        var wherestr = { 'id': led_id, status: 'PENDING' };
        Task.find(wherestr, function (err, res) {
            if (err) {
                console.log("Error:" + err);
                resp.send({ mess: '服务器错误！', data: { 'server_time': new Date(), err: err} });
            }
            else {
                // console.log("Res:" + res);
                let task = [];
                res.map((item, i) => {
                    task.push({
                        'id': item._id,
                        'status': item.status,
                        'datagram': item.datagram
                    })
                });
                let date = new Date();
                let year = date.getFullYear();
                let month = date.getMonth();
                let day = date.getDate();
                let hours = date.getHours();
                let minutes = date.getMinutes();
                let seconds = date.getSeconds();
                let ms = date.getMilliseconds();
                let UTC = Date.UTC(year, month, day, hours, minutes, seconds, ms)
                // console.log(task);

                if (task.length > 0) {

                    resp.send({
                        'server_time': UTC,
                        'task': task
                    });
                } else {
                    resp.send({
                        'server_time': UTC
                    });
                }


            }

        });

    } else {
        console.log('服务器常规应答！');
        var task = content.task;
        var PROCESSING = [];// 任务执行中
        var SUCCESS = [];// 任务成功
        var CANCEL = [];// 任务取消
        var FAILED = [];// 任务失败
        for (let index = 0; index < task.length; index++) {
            console.log('task.length');
            console.log(task.length);
            const element = task[index];
            if (element.status == 'PROCESSING') {
                PROCESSING.push(element.id);
            } else if (element.status == 'SUCCESS') {
                SUCCESS.push(element.id);
            } else if (element.status == 'CANCEL') {
                CANCEL.push(element.id);
            } else if (element.status == 'FAILED') {
                FAILED.push(element.id);
            }
            
        }
        if (PROCESSING.length > 0) { // 终端任务执行中->服务器常规应答！
            console.log('// 终端任务执行中->服务器常规应答');
            for (let index = 0; index < PROCESSING.length; index++) {
                const element = PROCESSING[index];
                console.log(`element: ${element}`);
                let wherestr = { '_id': element}; // 挂起任务-新任务
                let updatestr = { 'status': 'PROCESSING' }; // 任务执行中
                Task.update(wherestr, updatestr, function (err, res) {
                    if (err) {
                        console.log("Error:" + err);
                        resp.send({ mess: '服务器错误！', data: { 'server_time': new Date(), err: err} });
                    }
                    else {
                        console.log("Res:" + res);
                        let date = new Date();
                        let year = date.getFullYear();
                        let month = date.getMonth();
                        let day = date.getDate();
                        let hours = date.getHours();
                        let minutes = date.getMinutes();
                        let seconds = date.getSeconds();
                        let ms = date.getMilliseconds();
                        let UTC = Date.UTC(year, month, day, hours, minutes, seconds, ms);
                        resp.send({ 'server_time': UTC });
                        
                    }
                })
                
            }




        } 

        if (SUCCESS.length > 0) {  // 终端任务执行成功->服务器更新任务表
            console.log('// 终端任务执行成功->服务器更新任务表');
            for (let index = 0; index < SUCCESS.length; index++) {
                const element = SUCCESS[index];
                let wherestr = { '_id': element }; // 任务执行中
                let updatestr = { 'status': 'COMPLETE' }; // 任务完成

                Task.update(wherestr, updatestr, function (err, res) {
                    if (err) {
                        console.log("Error:" + err);
                        resp.send({ mess: '服务器错误！', data: { 'server_time': new Date(), err: err} });
                    }
                    else {
                        console.log("Res:" + res);

                    }
                })     
            }

            let result = [];
            task.map(item => {
                result.push({
                    'id': item.id,
                    'status': 'COMPLETE'
                })
            })
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth();
            let day = date.getDate();
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let seconds = date.getSeconds();
            let ms = date.getMilliseconds();
            let UTC = Date.UTC(year, month, day, hours, minutes, seconds, ms);
            resp.send({ 'server_time': UTC, 'task': result });


        }



        if (CANCEL.length > 0) {  // 终端任务执行取消->服务器更新任务表
            console.log('// 终端任务执行取消->服务器更新任务表');
            for (let index = 0; index < CANCEL.length; index++) {
                const element = CANCEL[index];
                // let wherestr = { '_id': element }; // 任务执行中
                // let updatestr = { 'status': 'CANCEL' }; // 任务完成
                let date = new Date();
                let year = date.getFullYear();
                let month = date.getMonth();
                let day = date.getDate();
                let hours = date.getHours();
                let minutes = date.getMinutes();
                let seconds = date.getSeconds();
                let ms = date.getMilliseconds();
                let UTC = Date.UTC(year, month, day, hours, minutes, seconds, ms);
                let task = [{
                    'id': element,
                    'status': 'CANCEL',

                }]


                resp.send({
                    'server_time': UTC,
                    task: task
                });
                // Task.update(wherestr, updatestr, function (err, res) {
                //     if (err) {
                //         console.log("Error:" + err);
                //         resp.send({ mess: '服务器错误！', data: { 'server_time': new Date(), err: err } });
                //     }
                //     else {
                //         console.log("Res:" + res);
                //         let date = new Date();
                //         let year = date.getFullYear();
                //         let month = date.getMonth();
                //         let day = date.getDate();
                //         let hours = date.getHours();
                //         let minutes = date.getMinutes();
                //         let seconds = date.getSeconds();
                //         let ms = date.getMilliseconds();
                //         let UTC = Date.UTC(year, month, day, hours, minutes, seconds, ms);
                //         resp.send({
                //             'server_time': UTC
                //         });

                //     }
                // })

            }
        }

        if (FAILED.length > 0) {  // 终端任务执行取消或失败->服务器更新任务表
            console.log('// 终端任务执行失败->服务器更新任务表');
            for (let index = 0; index < FAILED.length; index++) {
                const element = FAILED[index];
                // let wherestr = { '_id': element }; // 任务执行中
                // let updatestr = { 'status': 'FAILED' }; // 任务完成
                let date = new Date();
                let year = date.getFullYear();
                let month = date.getMonth();
                let day = date.getDate();
                let hours = date.getHours();
                let minutes = date.getMinutes();
                let seconds = date.getSeconds();
                let ms = date.getMilliseconds();
                let UTC = Date.UTC(year, month, day, hours, minutes, seconds, ms);
                let task = [{
                    'id': element,
                    'status': 'CANCEL',

                }]


                resp.send({
                    'server_time': UTC,
                    task: task
                });
                // Task.update(wherestr, updatestr, function (err, res) {
                //     if (err) {
                //         console.log("Error:" + err);
                //         resp.send({ mess: '服务器错误！', data: { 'server_time': new Date(), err: err } });
                //     }
                //     else {
                //         console.log("Res:" + res);
                //         let date = new Date();
                //         let year = date.getFullYear();
                //         let month = date.getMonth();
                //         let day = date.getDate();
                //         let hours = date.getHours();
                //         let minutes = date.getMinutes();
                //         let seconds = date.getSeconds();
                //         let ms = date.getMilliseconds();
                //         let UTC = Date.UTC(year, month, day, hours, minutes, seconds, ms);
                //         resp.send({
                //             'server_time': UTC
                //         });

                //     }
                // })

            }
        }
    }



});

// 搜索任务
module.exports = router;