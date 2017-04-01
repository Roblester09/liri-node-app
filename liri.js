var params = "";
var input = process.argv[2];
var secondInput = process.argv[3];

function myTweets(){
    var Twitter = require("twitter");
    var keys = require("./keys.js");
    var client = new Twitter({
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret
    });
    client.get('statuses/user_timeline', 'least_robert', function(error, tweets, response) {
        if (!error) {
            var output = "\r\n\r\n-----Your last 20 tweets are being displayed-----";
            output = output + "\r\n\r\n";
            for (var i = 0; i <= 19; i++) {
                output = output + "\r" + tweets[i].text + "\r\n";
            }
            console.log(output);
        }
    });
}

function spotified(secondInput){
    var spotify = require("spotify");
    
}

function random(){

}

function movie(secondfInput){

}


switch (input){
    case "my-tweets":
        myTweets();
        break;

    case "spotify-this-song":
        spotified();
        break;

    case "movie-this":
        movie();
        break;
    case "do-what-it-says":
        random();
        break;
}