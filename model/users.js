var mongoose=require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
    username : { type: String, required: true, unique: true },
    password : { type: String, required: true },
    address: {type: String},
    contact: {type: String},
    type : { type: String, required: true }
});

UserSchema.statics.authenticate = function(name, password, callback) {
    User.findOne({username: name}, function(err, user){
        if(err){
            return callback(err)
        }
        else if(!user){
            var err = new Error("No Such User!")
            callback(err)
        }
        else{
            bcrypt.compare(password, user.password, function(err, result){
                if(err)
                    return callback(err)
                if(result == true){
                    return callback(null, user)
                }
                else {
                    var err = new Error("Password not Macth!")
                    return callback(err)
                }
            });
        }
    });
}

UserSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});

var User = mongoose.model('User', UserSchema);
module.exports = User;

