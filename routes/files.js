var express = require('express');
var fs = require('fs'); //文件模块
var path = require('path'); //系统路径模块
var router = express.Router();
var Media = require("../model/media.js");
var Program = require("../model/program.js");

/* GET home page. */
router.get('/', function (req, resp, next) {
    resp.render('index', { title: 'Express' });
});

var renameSync = function () {
    var fs = require('fs');
    var counter = 1;
    var re = /(.*)+\.(json)$/i;

    fs.readdir('./', function (err, files) {
        if (err) {
            console.log("失败了");
            return;  //如果出错直接返回,就不用else了
        }

        files.forEach(function (fn) { //这样更简便
            if (!re.test(fn)) return;
            console.log(">>> " + fn);
            fs.renameSync(fn, test + counter + '.json'); //同步重命名
            counter++;
        }); 
    })
}

router.get('/gFiles', function (req, resp, next) {

    var id = req.query.id;   
    Program.findById(id, function (err, res) {
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);

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
            //把data对象转换为json格式字符串
            var content = JSON.stringify(result);
            var timestamp = (new Date()).valueOf(); 

            //指定创建目录及文件名称，__dirname为执行当前js文件的目录
            var file = path.join(__dirname, `data/${timestamp}.json`);

            //写入文件
            fs.writeFile(file, content, function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log('文件创建成功，地址：' + file);
                resp.send({ mess: '文件创建成功', addr: file });
            });
        }
    })



});

module.exports = router;



