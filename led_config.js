module.exports = {
    led_id: "DE1700220125", //终端id
    air_request_data : { // 获取空气质量的区域大小
        "ne": {
            "lng": 113.974546,
            "lat": 22.590191
        },
        "sw": {
            "lng": 113.882344,
            "lat": 22.527578
        }
    },
    air_device_id: '20000001',
    // 获取空气质量接口

    air_options : {
        host: '127.0.0.1',
        port: 10002,
        path: '/api/airmonitor/inbounds',
    },

    // 获取节目单接口
    program_options: {
        name : "空气质量播报",
        // url : "http://172.18.8.44:3000/programs/getProgram",
        url : "http://172.18.8.46:3000/programs/getProgram",
    },

    // 欢迎词
    wellcome_content: '新阳蓝光智慧城市欢迎您！',



};