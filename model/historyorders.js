var mongoose=require('mongoose');

var HistoryOrderSchema = new mongoose.Schema({
    description: {type: String, required: true},
    username: {type: String, required: true},
    driver: {type: String},
    address: {type: String, required: true},
    contact: {type: String, required: true},
    date: {type: String}
});

var History = mongoose.model('History', HistoryOrderSchema);
module.exports = History;