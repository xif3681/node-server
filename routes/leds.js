var express = require('express');

var router = express.Router();
var _get = require('../model/_get');
/* GET Programs listing. */
router.get('/', function (req, resp, next) {
    resp.send({ mess: 'hello lsq first node server' });
});
router.get('/getAir', function (req, res) {
    _get.locations(function (data) {
        console.log(data);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(data));
        res.end();
    });
});
module.exports = router;
