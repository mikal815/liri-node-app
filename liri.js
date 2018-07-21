require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var request = require("request")
var liriReturn = process.argv[2];
var twitter = require('twitter');
var client = new twitter(keys.twitter);



// Switches
switch (liriReturn) {
    case "my-tweets":
    myTweets();
    break;

    case "spotify-this-song":
    spotifyThisSong();
    break;
    

    default: console.log("\n" + "type one of the following commands after 'node liri.js': " + "\n" +
        "my-tweets" + "\n" +
        "spotify-this-song 'name of song' " + "\n" +
        "movie-this 'name of movie' " + "\n" +
        "do-what-it-says " + "\n" +
        "Must use quotations for multi-word entries")
};


// Functions
function myTweets() {
    var params = {screen_name: 'chiller01549953'};
    client.get('statuses/user_timeline', params, function (error, tweets, response){
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text);
            };
        } else {
            console.log("error: " + err);
            return
        };
    });
};

function spotifyThisSong(songName) {
    var songName = process.argv[3];
    if (!songName) {
        songName = "The Sign";
    };
    songRequest = songName;
    spotify.search({
        type: "track",
        query: songRequest
    },
        function (err, data){
            if (!err) {
                var songInfo = data.tracks.items;
                for (var i = 0; i < 5; i++) {
                    if (songInfo[i] != undefined) {
                        var spotifyResponse =
                        "Artist: " + songInfo[i].artists[0].name + "\n" +
                        "Song: " + songInfo[i].name + "\n" +
                        "Preview URL: " + songInfo[i].preview_url + "\n" +
                        "Album: " + songInfo[i].album.name + "\n"

                        console.log(spotifyResponse);
                        
                    };
                };
            } else {
                console.log("error: " + err);
                return;
            };
        });
};

