/**
 * Created by luo.shuqi on 8/10/18.
 */


var http = require('http');
var Program = require("./program.js");
var Task = require("./task.js");
var ledConfig = require('../led_config');
var name = ledConfig.program_options.name;
var tid = ledConfig.program_options.tid;
var url = ledConfig.program_options.url;

module.exports = {
    gProgram: function (item) {
        // const p = [
        //   {}
        // ];
        this.regions = [];


        this.regions.push(
            {
                'id': '1',
                'name': 'row1',
                'x': 0,
                'y': 0,
                'width': 96,
                'height': 38,
                'items': [
                    {
                        'font_name': 'msyh',
                        'font_size': '9',
                        'font_color': '#009CFF',
                        'background_color': '#00000000',
                        'effect_entry': '0',
                        'effect_exit': '18',
                        'time_entry': '3000',
                        'time_exit': '3000',
                        'id': '0',
                        'type': 'text',
                        'name': 'no name',
                        'loop': '1',
                        'length': 10000,
                        'contents': [
                            {
                                'content': `PM10: ${item.pm10}`
                            }
                        ]
                    }
                ]

            }
        );

        this.regions.push(
            {
                'id': '2',
                'name': 'row2',
                'x': 0,
                'y': 39,
                'width': 96,
                'height': 38,
                'items': [
                    {
                        'font_name': 'msyh',
                        'font_size': '9',
                        'font_color': '#009CFF',
                        'background_color': '#00000000',
                        'effect_entry': '0',
                        'effect_exit': '18',
                        'time_entry': '3000',
                        'time_exit': '3000',
                        'id': '0',
                        'type': 'text',
                        'name': 'no name',
                        'loop': '1',
                        'length': 10000,
                        'contents': [
                            {
                                'content': `PM2.5: ${item.pm25}`
                            }
                        ]
                    }
                ]

            }
        );

        this.regions.push(
            {
                'id': '31',
                'name': 'row3-1',
                'x': 0,
                'y': 80,
                'width': 96,
                'height': 38,
                'items': [
                    {
                        'font_name': 'msyh',
                        'font_size': '9',
                        'font_color': '#009CFF',
                        'background_color': '#00000000',
                        'effect_entry': '0',
                        'effect_exit': '18',
                        'time_entry': '3000',
                        'time_exit': '3000',
                        'id': '0',
                        'type': 'text',
                        'name': 'no name',
                        'loop': '1',
                        'length': 10000,
                        'contents': [
                            {
                                'content': `TVOC: ${item.tvoc}`
                            }
                        ]
                    }
                ]

            }
        );

        this.regions.push(
            {
                'id': '41',
                'name': 'row4-1',
                'x': 0,
                'y': 115,
                'width': 96,
                'height': 38,
                'items': [
                    {
                        'font_name': 'msyh',
                        'font_size': '9',
                        'font_color': '#009CFF',
                        'background_color': '#00000000',
                        'effect_entry': '0',
                        'effect_exit': '18',
                        'time_entry': '3000',
                        'time_exit': '3000',
                        'id': '0',
                        'type': 'text',
                        'name': 'no name',
                        'loop': '1',
                        'length': 10000,
                        'contents': [
                            {
                                'content': `温度: ${item.temperature}`
                            }
                        ]
                    }
                ]

            }
        );
        this.regions.push(
            {
                'id': '51',
                'name': 'row5-1',
                'x': 0,
                'y': 152,
                'width': 96,
                'height': 38,
                'items': [
                    {
                        'font_name': 'msyh',
                        'font_size': '9',
                        'font_color': '#009CFF',
                        'background_color': '#00000000',
                        'effect_entry': '0',
                        'effect_exit': '18',
                        'time_entry': '3000',
                        'time_exit': '3000',
                        'id': '0',
                        'type': 'text',
                        'name': 'no name',
                        'loop': '1',
                        'length': 10000,
                        'contents': [
                            {
                                'content': `湿度: ${item.humidity}`
                            }
                        ]
                    }
                ]

            }
        );
        // this.createProgram('空气质量播报');
        const body = {
            'name': name,
            'id': '1',
            'display_time': 0,
            'width': 96,
            'height': 192,
            'type': 0,
            regions: this.regions

        };


        console.log(this.regions);

        // 创建节目单

        var program = new Program(body);
        program.save(function (err, res) {

            if (err) {
                console.log("Error:" + err);
                console.log({ mess: '节目单添加失败！' });
            }
            else {
                console.log("Res:" + res);
                const _task_id = res._id;
                console.log({ mess: '节目单添加成功！' });
                // 创建任务

                const task_body = {

                    'id': tid || 'DE1700220125',
                    'status': 'PENDING',
                    'datagram': {
                        'request': 'update_program',
                        'arguments': [
                            {
                                'link': `${url}?id=${_task_id}`,
                                'local': `/mnt/user/data/programs.json`
                            }
                        ]
                    }

                };

                var task = new Task(task_body);
                task.save(function (err, res) {

                    if (err) {
                        console.log("Error:" + err);
                        console.log({ mess: '任务添加失败！' });
                    }
                    else {
                        console.log("Res:" + 'createTask');
                        console.log({ mess: '任务添加成功！' });
                    }

                });
            }

        });




    },


    locations: function (cb) {
        const NorthEast = {
            'lng': 113.998944,
            'lat': 22.590191
        }; // 返回矩形区域的东北角
        const SouthWest = {
            'lng': 113.902502,
            'lat': 22.527578
        };
        http.post('http://172.18.1.133:10002/api/airmonitor/inbounds', {
            'ne': NorthEast,
            'sw': SouthWest
        }, function (res) {
            res.setEncoding('utf8');
            var rawData = '';
            console.log(res);
            res.on('data', function (chunk) {
                rawData += chunk;
            });
            res.on('end', function () {
                try {
                    const parsedData = JSON.parse(rawData);
                    console.log(parsedData);
                    cb(parsedData);
                } catch (e) {
                console.error(e.message);
                    cb('error');
                }
            });
        });
    }
}
