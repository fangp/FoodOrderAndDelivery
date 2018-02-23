var express = require('express');
var router = express.Router();
var User = require('../model/users.js');
var Order = require('../model/orders.js');
var path = require("path");
var UserController = require('../controllers/user.controller');
var OrderController = require('../controllers/order.controllers');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname,'..','index.html'));
});

router.post('/signup', UserController.signup);

router.post('/login', UserController.login);

router.get('/check', UserController.check);

router.get('/logout', UserController.logout);

router.get('/order', OrderController.check);

router.post('/order', OrderController.add);

router.delete('/order', OrderController.delete);

router.put('/order', OrderController.update);

module.exports = router;
