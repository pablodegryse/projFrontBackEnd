let expect = require('chai').expect;
let StaticServer=require('../serverModules/StaticServer');
let ErrorLogger=require('../serverModules/ErrorLogger');
let ApiHandler=require('../serverModules/ApiHandler');
let RoomManager=require('../serverModules/RoomManager');
let ioClient=require('socket.io-client');
let socket1,socket2,socket3;

describe('backend testing', function() {
    describe('staticServer tests', function() {
        it('should have an init property that is a function', function() {
            expect(StaticServer).to.have.property('init').that.is.a('function');
        });
    });
    describe('ErrorLogger tests',function () {
        it('should have a log property that is a function',function () {
            expect(ErrorLogger).to.have.property('log').that.is.a('function');
        });
    });
    describe('SocketHandler tests',function () {
        it('should have an init property',function () {
            expect(StaticServer.serverSocketHandler).to.have.property('init');
        });
    });
    describe('apiHandler tests',function () {
        it('should have a getWordData property',function () {
            expect(ApiHandler).to.have.property('getWordData');
        });
    });
    describe('roomManager tests',function () {
        it('should have an ActiveRooms property that is an array',function () {
            expect(RoomManager).to.have.property('activeRooms').that.is.an('array');
        });
    });

    //test moet in aparte cmd uitgevoerd worden terwijl de server draait...
    describe('Socket server response tests',function () {
        before(function (done) {
            socket1 = ioClient.connect('http://localhost:8080/global', {
                'reconnection delay' : 0
                , 'reopen delay' : 0
                , 'force new connection' : true
                , transports: ['websocket']
            });
            socket2 = ioClient.connect('http://localhost:8080/global', {
                'reconnection delay' : 0
                , 'reopen delay' : 0
                , 'force new connection' : true
                , transports: ['websocket']
            });
            socket3 = ioClient.connect('http://localhost:8080/global', {
                'reconnection delay' : 0
                , 'reopen delay' : 0
                , 'force new connection' : true
                , transports: ['websocket']
            });
            socket1.on('serverInit',function (msg) {
                expect(msg).to.equal('connected to Pictionar-E');
                socket1.emit("requestMoveToQueue",null);
            });
            socket2.on('serverInit',function (msg) {
                expect(msg).to.equal('connected to Pictionar-E');
                socket2.emit("requestMoveToQueue",null);
            });
            socket3.on('serverInit',function (msg) {
                expect(msg).to.equal('connected to Pictionar-E');
                socket3.emit("requestMoveToQueue",null);
            });
            socket1.on('GameReady',function (msg) {
                expect(msg.content).to.equal("drawer");
                done();
            });
        });
        it('should get message from server and queued up and socket1 should be assigned drawer',function () {
            expect(socket1).to.not.be.undefined;
        });
    });

});