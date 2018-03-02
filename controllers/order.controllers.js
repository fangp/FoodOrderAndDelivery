let Order = require('../model/orders.js');
let History = require('../model/historyorders.js');

exports.check = async function(req, res){
    let username;
    let condition = {};
    if(req.decoded){
        username = req.decoded.username;
    }
    else{
        return res.status(401).json({status: 401, message: "please log in"});
    }
    if(req.decoded.type == "driver"){
        console.log("driver check");
        condition = {
            driver: ""
        };
    }
    else{
        console.log("customer check");
        condition = {
            username: username
        };
    }

    try{
        let AllOrder = await Order.find(condition);
        //console.log(AllOrder);
        //console.log(AllOrder);
        return res.status(201).json({status: 201, orderdata: AllOrder, message:"success"});
    }
    catch(e){
        console.log(e);
        return res.status(400).json({status:400, message: e.message});
    }
};

exports.delete = function(req, res){
    if(!req.decoded){
        return res.status(401).json({status: 401, message: "please log in"});
    }
    let id = req.params.id;
    Order.findOneAndRemove({_id: id}, function (err, order) {
        if(err){
            console.log(err);
            return res.status(400).json({status: 400, message: "No such order"});
        }
        else{
            let historyorder = {
                username: order.username,
                description: order.description,
                address: order.address,
                contact: order.contact,
                date: order.date,
                driver: order.driver
            };
            History.create(historyorder, function (err, result) {
                if(err){
                    return res.status(400).json({status: 400, message: err.message});
                }
                else{
                    console.log(result);
                    return res.status(200).json({status: 200, message: "success"});
                }
            });
        }
    });
};

exports.add = function(req, res){
    if(!req.decoded){
        return res.status(401).json({status: 401, message: "please log in"});
    }
    let userorder = {
            description: req.body.description,
            username: req.decoded.username,
            driver: "",
            address: req.body.address,
            contact: req.body.contact,
            date: new Date()
        };
    Order.create(userorder, function (err, order) {
        if(err){
            return res.status(401).json({status:401, message:err.message});
        }
        else{
            return res.status(200).json({status:200, message:"success"});
        }
    });
};

exports.update = function(req, res){
    let driver;
    let id;
    try{
        if(req.decoded){
            id = req.body.orderId;
            driver = req.decoded.username;
        }
        else{
            return res.status(401).json({status: 401, message: "please log in"});
        }
        Order.update({_id:id}, {driver: driver}, function (err, order) {
            if(err){
                return res.status(400).json({status: 400, message: err.message});
            }
            else
                return res.status(200).json({status: 400, message: "success"});
        })
    }
    catch(e){
        console.log(e);
    }

};