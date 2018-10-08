module.exports = {
    air_request_data : {
        "ne": {
            "lng": 113.974546,
            "lat": 22.590191
        },
        "sw": {
            "lng": 113.882344,
            "lat": 22.527578
        }
    },
    // 获取空气质量接口
    air_options : {
        host: '172.18.1.133',
        port: 10002,
        path: '/api/airmonitor/inbounds',
    },
    // 获取节目单接口
    program_options: {
        name : "空气质量播报",
        tid : "DE1700220125",
        url : "http://172.18.8.44:3000/programs/getProgram",
    }
};