var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../dbmodels/user');

router.get('/', function (req, res, next) {
    User.find()
        .exec(function (err, users) {
        if(err){
            return res.status(500).json({
                title:'An error occured',
                error: err
            });
        }
        res.status(200).json({
            message: 'Success',
            obj: users
        });
    })
});

router.get('/:id',function(req,res,next){
    User.findById(req.params.id)
        .populate({
            path:'friends',
            populate:{path:'friends'}
        })
        .exec(function (err, user) {
        if(err) {
            return res.status(500).json({
                title:'An error occurred',
                error:err
            });
        }
        res.status(200).json({
            message:'Succes',
            obj:user
        });
    })
});

router.post('/', function (req, res, next) {
    var user = new User({
        nickName: req.body.nickName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email,
        points: "0"
    });
    user.save(function(err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'User created',
            obj: result
        });
    });
});

router.post('/signin', function(req, res, next) {
    User.findOne({email: req.body.email}, function(err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        if(user.status == 'online'){
            return res.status(401).json({
                title:'Signin failed',
                error: {message:'User already logged in'}
            });
        }
        var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
        user.status = 'online';
        user.save();
        res.status(200).json({
            message: 'Successfully logged in',
            token: token,
            user: user
        });
    });
});

router.patch('/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    var userId = req.params.id;
    User.findById(userId,function (err, user) {
        if(err){
            return res.status(500).json({
                title:'An error occured while finding user',
                error: err
            });
        }
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
            //user.save();
            res.status(200).json({
                message: 'Updated user',
                obj: result
            });
        });
    });
});


module.exports = router;
