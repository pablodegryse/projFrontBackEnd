var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user');

var schema = new Schema({
    name: {type: String, required: true},
    users: [{type: Schema.Types.ObjectId, ref: 'User'}]
});


module.exports = mongoose.model('Room', schema);