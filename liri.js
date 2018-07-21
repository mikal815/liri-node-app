require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs");
// var Spotify = require('node-spotity-api');
// var spotify = new Spotify(keys.spotify);
var request = require("request")
var liriReturn = process.argv[2];
var twitter = require('twitter');
var client = new twitter(keys.twitter);



// Switches
switch (liriReturn) {
    case "my-tweets":
    myTweets();
    break;
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

