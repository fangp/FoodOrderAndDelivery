var express = require('express');
var router = express.Router();
var User = require('../model/users.js');
var Order = require('../model/orders.js');
var path = require("path");
var UserController = require('../controllers/user.controller');
var OrderController = require('../controllers/order.controllers');
var jwt = require('jsonwebtoken');
/* GET users listing. */

router.use(function(req, res, next){
  var token = req.get('x-access-token');
  //console.log(req.headers);
  if(token){
    jwt.verify(token, function (err, decoded) {
        if(err){
          console.log(err);
        }
        else{
          User.findOne({username: decoded.username}, function (err, user) {
            if(err)
              console.log(err);
            else{
              var data = {
                  username: user.username,
                  address: user.address,
              }
              return res.status(200).json({status: 200, user: data, message: "user logged in"});
            }
          });

        }
    })
  }
  next();
});

router.post('/signup', UserController.signup);

router.post('/login', UserController.login);

router.get('/check', UserController.check);

router.get('/order', OrderController.check);

router.post('/order', OrderController.add);

router.delete('/order', OrderController.delete);

router.put('/order', OrderController.update);

module.exports = router;
