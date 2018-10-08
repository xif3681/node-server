var request = require('request');
var http = require('http');
var qs = require('querystring');
var _get = require('./model/_get');
// request('http://www.baidu.com', function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//         console.log(body) // Show the HTML for the baidu homepage.
//     }
// })


const url = "http://172.18.1.133:10002/api/airmonitor/inbounds";

var requestData = {
    "ne": {
        "lng": 113.974546,
        "lat": 22.590191
    },
    "sw": {
        "lng": 113.882344,
        "lat": 22.527578
    }
}

var content = JSON.stringify(requestData);
console.log("content:", content);

var options = {
    host:'172.18.1.133',
    port: 10002,
    path:'/api/airmonitor/inbounds',
    method:'POST',
    headers: {
        "Content-Type": 'application/json',
        "Content-Length": content.length
    }
};


setInterval(() => {
    var req = http.request(options, function (serverFeedback) {
        console.log("statusCode: ", serverFeedback.statusCode);
        console.log("headers: ", serverFeedback.headers);

        if (serverFeedback.statusCode == 200) {
            var _data = "";
            serverFeedback.on('data', function (data) {
                _data += data;
            });
            serverFeedback.on('end', function () {
                console.log("\n--->>\nresult:", _data);
                console.log(typeof (_data));
                const pp = JSON.parse(_data);
                console.log(pp);
                console.log(typeof (pp));
                _get.gProgram(pp[0]);
            });

        } else {
            res.send(500, "error");
        }
    });
    req.write(content + "\n");
    req.end();

}, 20000);




