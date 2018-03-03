var mongoose=require('mongoose');

var OrderSchema = new mongoose.Schema({
    description: {type: String, required: true},
    username: {type: String, required: true},
    driver: {type: String},
    address: {type: String, required: true},
    contact: {type: String, required: true},
    time: {
        order: {type: Date},
        pickup: {type: Date},
        finish: {type: Date}
    }
});

var Order = mongoose.model('Order', OrderSchema);
module.exports = Order;