let ApiHandler=(function () {
    let http=require("http");
    let url="http://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&includePartOfSpeech=idiom&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=8&limit=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";
    let getData=function (callback) {
        //random woord api hier aanspreken
        http.get(url,function (response) {
            console.log("doing request to api");
            var json="";
            response.on('data', function (chunk) {
                json+= chunk;
            });
            response.on('end', function () {
                callback(null,JSON.parse(json));
            });
            response.on('error', function (err) {
                callback(err,null);
            });
        });
    };
    //public
    return{
        getData:getData
    }
})();
module.exports=ApiHandler;
