let express = require('express');
let router = express.Router();
let User = require('../model/users.js');
let Order = require('../model/orders.js');
let path = require("path");
let UserController = require('../controllers/user.controller');
let OrderController = require('../controllers/order.controllers');
let jwt = require('jsonwebtoken');
/* GET users listing. */
router.use(function (req, res, next) {
    let token = req.get('x-access-token');
    //console.log(token);
    if(token){
            jwt.verify(token, 'a secret', function(err, decoded) {
                if (err){
                    console.log("invalid token");
                    next();
                }
                else{
                    req.decoded = decoded;
                    next();
                }
            });
    }
    else{
        console.log("no token provided");
        next();
    }
});

router.post('/signup', UserController.signup);

router.post('/login', UserController.login);

router.get('/check', UserController.check);

router.put('/user', UserController.update);

router.get('/order', OrderController.check);

router.post('/order', OrderController.add);

router.delete('/order/:id', OrderController.delete);

router.put('/order', OrderController.update);

module.exports = router;
