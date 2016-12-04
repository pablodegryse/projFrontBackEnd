let express = require('express');
let router = express.Router();
let path=require("path");
let ApiHandler=require("../serverModules/ApiHandler");
let errorLogger = require('../serverModules/ErrorLogger');

router.get('/client/js/*', function(req, res) {
    res.sendFile(path.join(__dirname,'.','client','js',req.url));
});

router.get('/client/css/*',function (req,res) {
    console.log(req.url);
    res.sendFile(path.join(__dirname,'..','client','css',req.url));
});

router.get('/getApiData',function (req,res) {
    ApiHandler.getData(function (err,data) {
        if(!err){
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(data));
        }else {
            errorLogger.log(err);
        }
    })
});

router.get('/index',function (req,res) {
    console.log(req.url);
    res.sendFile(path.join(__dirname,'..','client','views','index.html'),function (err) {
        if(err){
            errorLogger.log(err);
        }
    });
});
router.get('/',function (req,res) {
    res.sendFile(path.join(__dirname,'..','client','views','index.html'),function (err) {
        if(err){
            errorLogger.log(err);
        }
    });
});

router.get('*',function (req,res) {
    res.sendFile(path.join(__dirname,'..','client','views','error.html'))
});

module.exports = router;
