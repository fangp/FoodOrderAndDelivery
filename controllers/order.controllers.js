let Order = require('../model/orders.js');
let User = require('../model/users');

exports.check = async function(req, res){
    let username;
    if(req.decoded){
        username = req.decoded.username;
    }
    else{
        return res.status(401).json({status: 401, message: "please log in"});
    }
    let condition = {
        username: username
    };

    try{
        let AllOrder = await Order.find(condition);
        //console.log(AllOrder);
        return res.status(201).json({status: 201, orderdata: AllOrder, message:"success"});
    }
    catch(e){
        console.log(e);
        return res.status(400).json({status:400, message: e.message});
    }
}

exports.delete = async function(req, res){
    if(!req.session)
        return res.status(422).json({status: 422, message: "please login"});
    var username = req.session.username;
    var id = req.body.id;
    try{
        var order = await Order.findOne({_id: id});
        if(order.driver){
            return res.status(409).json({status: 409, message: "order is under delivery"});
        }
    }
    catch(e){
        return res.status(400).json({status: 400, message: "No such order"});
    }

    try{
        Order.remove({_id: id}).exec();
        return res.status(200).json({status:200, message: "order has been canceled"});
    }
    catch(e){
        return res.status(400).json({status: 400, message: "No such order"});
    }

}

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
}

exports.update = function(req, res){
    if(!req.session)
        return res.status(422).json({status: 422, message: "please login"});
    var id = req.session._id;
    var driver = req.session.username;
    Order.update({_id:ObjectId(id)}, {driver: driver}, function (err, order) {
        if(err){
            return res.status(400).json({status: 400, message: err.message});
        }
        else
            return res.status(200).json({status: 400, message: "success"});
    })
}