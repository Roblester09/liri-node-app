//Define all of my variables (user input params and npm apis)
var input = process.argv[2],
    secondInput = process.argv[3],
    Twitter = require("twitter"),
    keys = require("./keys.js"),
    spotify = require("spotify"),
    request = require("request"),
    fs = require("fs");

//Function that gathers the last 20 tweets from the twitter npm
function myTweets(){

    var client = new Twitter({
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret
    });
    client.get('statuses/user_timeline', 'least_robert', function(error, tweets, response) {

        if (error) {
            throw (error);
        }
        for (var i = 0; i < tweets.length; i++){
            console.log(tweets[i].created_at + " - " + (tweets[i].text));
        }
    });
}

//Function that searches for a song entered by the user through the spotify npm
function spotified() {

    if (secondInput === undefined) {
        secondInput = "The Sign";
    }

    spotify.search({ type: "track", query: secondInput, limit: 1}, function(error, data) {
        if (error) {
            throw (error);
        }

        console.log("Searching for song....");
        console.log("Artist(s): " + data.tracks.items[0].album.artists[0].name);
        console.log("Song: " + data.tracks.items[0].name);
        console.log("Preview Link: " + data.tracks.items[0].preview_url);
        console.log("Album: " + data.tracks.items[0].album.name);
    });

}

//A Function that searches for a movie entered by the user through the omdb website
function movie(){

    var movieName = secondInput.replace(/ /g, "+");
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&tomatoes=true";

    request(queryUrl, function (error, response, data) {
        if (error) {
            throw (error);
        }

        var movie = JSON.parse(data);
        console.log("Title: " + movie.Title);
        console.log("IMDB Rating: " + movie.imdbRating);
        console.log("Country Produced: " + movie.Country);
        console.log("Language: " + movie.Language);
        console.log("Plot: " + movie.Plot);
        console.log("Actors: " + movie.Actors);
        console.log("Rotten Tomatoes Rating: " + movie.tomatoRating);
        console.log("Rotten Tomatoes URL: " + movie.tomatoURL);
    });
}

//A function that chooses which function to run based on the user input.
function random(){

    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error){
            throw (error);
        }
        // finds index of comma in .txt file. Splits two parts of .txt files, assigns them to new vars, re-assigns these vars to command and search vars
        var splitIndex = data.indexOf(",");
        var thisInput = data.substring(0, splitIndex);
        var thisSecondInput = data.substring(splitIndex+1);
        input = thisInput;
        secondInput = thisSecondInput;

        // runs switch statement
        switch (input) {
            case "my-tweets":
                console.log("Getting your tweets...");
                myTweets();
                break;

            case "spotify-this-song":
                console.log("Spotifying your song...");
                spotified();
                break;

            case "movie-this":
                console.log("Finding your movie...");
                movie();
                break;

            default:
                console.log("Something went Wrong... Try again");
        }
    });
}

//Switch statement to determine which function to run based on user input
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

    default:
        console.log("Something went Wrong... Try again");
}