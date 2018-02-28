var mongoose=require('mongoose');

var OrderSchema = new mongoose.Schema({
    description: {type: String, required: true},
    username: {type: String, required: true},
    driver: {type: String},
    address: {type: String},
    contact: {type: String, required: true},
    date: {type: String}
});

var Order = mongoose.model('Order', OrderSchema);
module.exports = Order;