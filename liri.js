require("dotenv").config();

// Variables
var keys = require("./keys.js");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var request = require("request")
var movieName = process.argv[3];
var liriReturn = process.argv[2];
var twitter = require('twitter');
var client = new twitter(keys.twitter);
var spotifySong = process.argv[3];


// Switches
switch (liriReturn) {
    case "my-tweets":
    myTweets();
    break;

    case "spotify-this-song":
    spotifyThisSong(spotifySong);
    break;
    
    case "movie-this":
    movieThis();
    break;

    case "do-what-it-says":
    doWhatItSays();
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
                console.log(tweets[i].created_at);
            };
        } else {
            console.log("error: " + err);
            return
        };
    });
};

function spotifyThisSong(songName) {
    console.log('Do what ' + songName);
    
    if (songName) {
        var songRequest = songName;
       ;
    } else {
        var songRequest = "The Sign Ace of Base"
        
    };
    
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

                        fs.appendFile("log.txt", spotifyResponse, function(err) {
                            if (err) throw err;
                            console.log('Saved!');
                        });
                        
                    };
                };
            } else {
                console.log("error: " + err);
                return;
            };
        });
};

function movieThis() {
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function(error, response, body) {
        if (!error && response.statusCode === 200) {

            var movieInfo = JSON.parse(body);
            var omdbResponse =
            "Title: " + movieInfo.Title + "\n" +
            "Year: " + movieInfo.Year + "\n" +
            "IMDB Rating: " + movieInfo.Ratings[0].Value + "\n" +
            "Rotten Tomatoes Rating: " + movieInfo.Ratings[1].Value + "\n" +
            "Origin Country: " + movieInfo.Country + "\n" +
            "Language: " + movieInfo.Language + "\n" +
            "Plot: " + movieInfo.Plot + "\n" +
            "Actors: " + movieInfo.Actors + "\n"

            console.log(omdbResponse);

            fs.appendFile("log.txt", omdbResponse, function(err) {
                if (err) throw err;
                console.log('Saved!');
                
            });
             

        } else { 
            console.log("error: " + err);
            return;
        };
    });
};


function doWhatItSays(){

    var fs = require('fs');
    
      fs.readFile('random.txt','utf8', function(err,data){
          if(err) throw err;
    
          var dataSplit = data.split(',');
              userInput = dataSplit[0];
              userChoice = dataSplit[1];
    
                console.log(dataSplit[0]);
                console.log(dataSplit[1]);

          switch(userInput){
    
              case "my-tweets":
                myTweets();
                break;
    
              case "spotify-this-song":
                spotifyThisSong(userChoice);
                break;
            
              case "movie-this":
                movieThis();
                break;

              case "do-what-it-says":
                doWhatItSays();
                break;  
  
          }
    
      });
    
    };