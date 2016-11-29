let ErrorLogger=require("./serverModules/ErrorLogger");
/*
process.on("uncaughtException",function (err) {
    ErrorLogger.log(err);
});
*/

let StaticServer=require("./serverModules/StaticServer");
StaticServer.init(8080,ErrorLogger);