// var request = require('request');
var http = require('http');
// var qs = require('querystring');
var _get = require('./model/_get');
var ledConfig = require('./led_config');
// request('http://www.baidu.com', function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//         console.log(body) // Show the HTML for the baidu homepage.
//     }
// })




var requestData = ledConfig.air_request_data;
var content = JSON.stringify(requestData);
// var wellcome_content = ledConfig.air_device_id;
var air_device_id = ledConfig.air_device_id;
var airOptions = {
    host: ledConfig.air_options.host,
    port: ledConfig.air_options.port,
    path: ledConfig.air_options.path,
    method: 'POST',
    headers: {
        "Content-Type": 'application/json',
        "Content-Length": content.length
    }
};


console.log("content:", content);

function creatPro() {
    var req = http.request(airOptions, function (serverFeedback) {
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
                // _get.gWell(wellcome_content);//欢迎词
                let ele = getAirById(air_device_id) || pp[0];
                console.log(ele);
                if (ele) {
                    _get.gProgram(ele);
                }


            });

        } else {
            console.log(500, "error");
        }
    });
    req.write(content + "\n");
    req.end();
}

function getAirById(id, arr) {
    let ele;
    console.log(arr)
    if (arr) {
        arr.map((item, i) => {
            if (item.name === id) {
                ele = item;
            }
        })
    }

    return ele;
}

creatPro();
setInterval(() => {
    creatPro();
}, 1000*60*3);




