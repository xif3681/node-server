/**
 * Created by luo.shuqi on 8/10/18.
 */


var Program = require("./program.js");
var Task = require("./task.js");
var ledConfig = require('../led_config');
var name = ledConfig.program_options.name;
var tid = ledConfig.led_id;
var url = ledConfig.program_options.url;
function createProgram(body, nameme) {
    var program = new Program(body);
    program.save(function (err, res) {

        if (err) {
            console.log("Error:" + err);
            console.log({ mess: '节目单添加失败！' });
        }
        else {
            console.log("Res:" + res);
            const _pro_id = res._id;
            console.log({ mess: '节目单添加成功！' });
            // 删除之前的任务
            let wherestr = { 'status': 'PENDING'}; // 挂起任务-新任务
            let updatestr = { 'status': 'CANCEL' }; // 任务执行中
            Task.update(wherestr, updatestr, { multi: true }, function (err, res) {

                if (err) {
                    console.log("Error:" + err);
                }
                else {
                    console.log("Res:" + 'res');
                    console.log('// 取消之前的任务');

                }
            })
            // 创建任务

            const task_body = {

                'id': tid || 'DE1700220125',
                'name': nameme,
                'proid': _pro_id,
                'status': 'PENDING',
                'datagram': {
                    'request': 'update_program',
                    'arguments': [
                        {
                            'link': `${url}?id=${_pro_id}`,
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
}


module.exports = {
    gWell: function (wellcome_content) {
        const body = {
            'name': '欢迎词',
            'id': '1',
            'display_time': 0,
            'width': 96,
            'height': 192,
            'type': 0,
            regions: [
                {
                    "id": "1",
                    "name": "Text Message",
                    "x": 0,
                    "y": 0,
                    "width": 96,
                    "height": 192,
                    "items": [
                        {
                            "background_color": "#00000000",
                            "effect": "0",
                            "speed": "2",
                            "pause_time": "3000",
                            "id": "0",
                            // "type": "slide_text",
                            "name": "no name",
                            "length": 1000,
                            "type": "text",

                            "font_name": "msyh",
                            "font_size": "9",
                            "font_color": "#ff0000",
                            "contents": [
                                {
                                    "content": wellcome_content
                                }
                            ]
                        }
                    ]
                }
            ],

        };
        createProgram(body,'欢迎词');
    },

    gProgram: function (item) {

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
                        'length': 1000,
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
                        'length': 1000,
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
                        'length': 1000,
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
                        'length': 1000,
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
                        'length': 1000,
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
            'id': '2',
            'display_time': 0,
            'width': 96,
            'height': 192,
            'type': 0,
            regions: this.regions

        };

        createProgram(body,'空气质量播报');

        // 创建节目单






    },


}
