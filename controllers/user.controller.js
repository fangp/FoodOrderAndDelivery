let User = require('../model/users.js');
let jwt = require('jsonwebtoken');

exports.signup = async function(req, res){
    console.log("A new user");
    let username = req.body.username;
    let password = req.body.password;
    let type = req.body.type;
    let address = req.body.address;
    let contact = req.body.contact;

    let userdata = {
        username: username,
        password: password,
        type: type,
        address: address,
        contact: contact
    };

    try{
        let user = await User.findOne({username: username});
        console.log(user);
        if(user)
            return res.status(422).json({status: 422, message: "username already existed"})
    }
    catch(e){
        return res.status(422).json({status: 422, message: e.message})
    }

    try{
        let user = await User.create(userdata);
        let token_data = {
            username: user.username,
            type: user.type,
            address: user.address,
            contact: user.contact
        };
        let token = jwt.sign(token_data, 'a secret', {
            expiresIn: 86400
        });
        return res.status(200).json({status: 200, message: "signup success", token: token})
    }
    catch(e){
        return res.status(422).json({status: 422, message: e.message})
    }
};

exports.login = async function(req, res){
    console.log("new login");
    let username = req.body.username;
    let password = req.body.password;
    try{
        console.log(req.body);
        await User.authenticate(username, password, function (err, user) {
            if(err)
                return res.status(422).json({status: 422, message: err.message});
            let token_data = {
                username: user.username,
                type: user.type,
                address: user.address,
                contact: user.contact
            };
            let token = jwt.sign(token_data, "a secret", {
                expiresIn: 86400
            });
            console.log(username +" logged in");
            return res.status(200).json({status: 200, user: token_data, token: token, message: "success"});
        });
    }
    catch(e){
        return res.status(422).json({status: 422, message: e.message});
    }
};

exports.check = function(req, res){
    console.log("check");
    if(req.decoded){
        let data = {
            username: req.decoded.username,
            type: req.decoded.type,
            address: req.decoded.address,
            contact: req.decoded.contact
        };
        return res.status(200).json({status: 200, user: data, message:"user has logged in"});
    }
    else
        return res.status(401).json({status: 401, message:"Invalid token"});

    // let token = req.get('x-access-token');
    // if(token){
    //     try{
    //         jwt.verify(token, 'a secret', function(err, decoded){
    //             if(err)
    //                 return res.status(401).json({status: 401, message:"Invalid token"});
    //             else{
    //                 User.findOne({username: decoded.username}, function(err, user){
    //                     if(err)
    //                         return res.status(401).json({status: 401, message:"No such user"});
    //                     else{
    //                         let data = {
    //                             username: user.username,
    //                             address: user.address,
    //                             contact: user.contact
    //                         };
    //                         return res.status(200).json({status: 200, user: data, message: "user has been logged in"});
    //                     }
    //
    //                 });
    //             }
    //         });
    //     }
    //     catch(e){
    //         console.log(e);
    //     }
    //
    // }
    // else
    //     return res.status(401).json({status: 401, message:"No token provided"});
};


