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
    status:{type:String},
    room: {type: Schema.Types.ObjectId, ref:'Room'}
});
var User = mongoose.model('User',schema);

User.getUsers = function (callback) {
    User.find()
        .exec(function (err, users) {
            if(err){
                return res.status(500).json({
                    title:'An error occured',
                    error: err
                });
            }
            callback(users);
        });
};

User.update = function (req, res, next) {
    User.findById(req.body._id,function (err, user) {
            if(err){
                return res.status(500).json({
                    title:'An error occured while finding user',
                    error: err
                });
            }
            if(user!=null){
                user.points = req.body.points;
                user.friends = req.body.friends;
                user.status = req.body.status;

                user.save(function (err, result) {
                    if (err) {
                        return res.status(500).json({
                            title: 'An error occurred while saving user',
                            error: err
                        });
                    }
                    res.status(200).json({
                        message: 'Updated user',
                        obj: result
                    });
                });
            }
        });
};

User.updatePoints = function (req, res, next) {
    User.findById(req._id,function (err, user) {
            if(err){
                return next(err);
            }
            if(user!=null){
                user.points = req.points;
                user.save(function (err, result) {
                    if (err) {
                        return next(err);
                    }
                    return result;
                });
            }
        });
};

schema.plugin(mongooseUniqueValidator);

module.exports = User;