var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../dbmodels/user');
var Room = require('../dbmodels/room');

router.get('/', function (req, res, next) {
    Room.find()
        .populate('users', 'nickName')
        .exec(function (err, rooms) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: rooms
            });
        });
});

/*router.use('/', function (req, res, next) {
 jwt.verify(req.query.token, 'secret', function (err, decoded) {
 if (err) {
 return res.status(401).json({
 title: 'Not Authenticated',
 error: err
 });
 }
 next();
 })
 });*/

router.post('/', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        var room = new Room({
            name: req.body.name
        });
        room.users.push(new User(
            user,
            user.nickName,
            user.firstName,
            user.lastName,
            user.password,
            user.email,
            user.room
        ));
        room.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            user.room = room;
            user.save();
            res.status(201).json({
                message: 'Saved room',
                obj: result
            });
        });
    });
});

router.patch('/:id', function (req, res, next) {
    console.log("request:" + req.body.content);
    var decoded = jwt.decode(req.query.token);
    var user = req.query.user;
    User.findById(user,function (err, user) {
        if(err){
            return res.status(500).json({
                title:'An error occured',
                error: err
            });
        }
        Room.findById(req.params.id, function (err, room) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            if (!room) {
                return res.status(500).json({
                    title: 'No room Found!',
                    error: {message: 'room not found'}
                });
            }
            console.log("found room:" + room);
            room.users = req.body.users;
            console.log("new room: " +room);
            room.save(function (err, result) {
                console.log("saved room:" + result);
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }
                user.save();
                res.status(200).json({
                    message: 'Updated room',
                    obj: result
                });
            });
        });
    });

});

module.exports = router;