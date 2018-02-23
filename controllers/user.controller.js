var User = require('../model/users.js');

exports.signup = async function(req, res){
    console.log("A new user");
    var username = req.body.username;
    var password = req.body.password;
    var type = req.body.type;
    var address = req.body.address;

    var userdata = {
        username: username,
        password: password,
        type: type,
        address: address
    }

    try{
        var user = await User.findOne({username: username})
        if(user)
            return res.status(422).json({status: 422, message: "username already existed"})
    }
    catch(e){
        return res.status(422).json({status: 422, message: e.message})
    }

    try{
        var user = await User.create(userdata)
        req.session.userId = user._id;
        req.session.username = username;
        req.session.type = type;
        return res.status(200).json({status: 200, message: "signup success"})
    }
    catch(e){
        return res.status(422).json({status: 422, message: e.message})
    }
}

exports.check = function (req, res) {
    console.log("new check");
    if(req.session.userId){
        User.findOne({_id: req.session.userId}, function (err, user) {
            if(err){
                console.log("user hasn't logged in");
                return res.status(422).json({status:422, message: "please log in"});
            }
            else{
                console.log(user);
                return res.status(200).json({status:200,
                    user: {'username':user.username, 'address': user.address, 'type': user.type},
                    message:"user already logged in"});
            }
        })
    }
    return res.status(422).json({status:422, message: "please log in"});
}

exports.login = async function(req, res){
    console.log("new login");
    var username = req.body.username;
    var password = req.body.password;
    var type = req.body.type;
    try{
        console.log(req.body);
        await User.authenticate(username, password, function (err, user) {
            if(err)
                return res.status(422).json({status: 422, message: err.message});
            req.session.userId = user._id;
            req.session.username = username;
            req.session.type = type;
            console.log(username +" logged in");
            return res.status(200).json({status: 200, message: "success"});
        });
    }
    catch(e){
        return res.status(422).json({status: 422, message: e.message});
    }
}

exports.logout = async function(req, res){
    console.log(req.session.userId+" log out!");
    if(req.session.username){
        req.session.destroy();
        req.session = null;
        console.log(req.session);
        return res.status(200).json({status: 200, message: "success"});
    }
    else{
        return res.status(422).json({status: 422, message: "Wrong Status"});
    }
}


