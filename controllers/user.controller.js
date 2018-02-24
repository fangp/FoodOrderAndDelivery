var User = require('../model/users.js');
var jwt = require('jsonwebtoken');

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
        var token = jwt.sign({user: user.username}, "a secret", {
            expiresInMinutes: 1440
        });
        return res.status(200).json({status: 200, message: "signup success", token: token})
    }
    catch(e){
        return res.status(422).json({status: 422, message: e.message})
    }
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
            var token = jwt.sign({user: user.username}, "a secret", {
                expiresIn: 86400
            });
            var data = {
                username: user.username,
                address: user.address
            }
            console.log(username +" logged in");
            return res.status(200).json({status: 200, user: data, token: token, message: "success"});
        });
    }
    catch(e){
        return res.status(422).json({status: 422, message: e.message});
    }
}

exports.check = function(req, res){

}
// exports.logout = async function(req, res){
//     console.log(req.session.userId+" log out!");
//     var token = req.headers['x-access-token'];
//     if(token){
//
//     }
//     else{
//         return res.status(422).json({status: 422, message: "Wrong Status"});
//     }
// }


