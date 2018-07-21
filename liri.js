require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs");
var Spotify = require('node-spotity-api');
var spotify = new Spotify(keys.spotify);
var request = require("request")
var twitter = require('twitter');
var client = new twitter(keys.twitter);



// * `my-tweets`

// * `spotify-this-song`

// * `movie-this`

// * `do-what-it-says`

