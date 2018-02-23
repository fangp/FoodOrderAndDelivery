var Order = require('../model/orders.js');

exports.check = async function(req, res){
    if(!req.session)
        return res.status(422).json({status: 422, message: "please login"});
    var type = req.session.type;
    var condition = {};
    if(type == "1"){ //normal use
        console.log("normal user: "+req.session.username+" check orders");
        var username = req.session.username;
        condition = {
            user: username
        };
    }
    else if(type == "2"){// driver
        console.log("driver: "+req.session.username+" check orders");
        var driver = "";
        condition = {
            driver: driver
        };
    }
    else if(type == "admin"){// admin
        console.log("admin: "+req.session.username+" check orders");
    }
    else{
        return res.status(422).json({status: 422, message: "please login"});
    }

    try{
        var order = Order.find(condition);
        return res.status(201).json({status: 201, data: order, message:"success"});
    }
    catch(e){
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
    if(!req.session)
        return res.status(422).json({status: 422, message: "please login"});
    var username = req.session.username;
    var date = new Date();
    var description = req.body.description;
    var userorder = {
            description: description,
            user: username,
            driver: "",
            date: date
        };
    Order.create(userorder, function (err, order) {
        if(err){
            return res.status(400).json({status:400, message:err.message});
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