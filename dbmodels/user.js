var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    nickName: {type: String, required:true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    friends: [{type: Schema.Types.ObjectId, ref: 'User'}],
    points:{type: Number},
    room: {type: Schema.Types.ObjectId, ref:'Room'}
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);