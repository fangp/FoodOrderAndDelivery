var express = require('express');
var router = express.Router();
var path = require('path')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/orders', function(req, res, next){
    res.sendFile(path.join(__dirname, '..', 'data.html'));
});

router.get('/home', function (req, res, next) {
    res.sendFile(path.join(__dirname, '..', 'home.html'));
})
module.exports = router;
