const fs = require('fs')

var spotifyApi = require("./spotify")
var token = "" // Your API key

var recurser = 0
var test = 0
function downloadJson(r) {
    spotifyApi.getPlaylistData("4aT57TW3ikoO0QJzkAGUBv", r, 10, token, function(json) {
        var parsed = JSON.parse(json);
        if (parsed.next == null) {
            //stop
        } else {
            recurser = recurser+10
            for (const song in parsed.items) {
                test = test+1
                console.log(parsed.items[song].added_by.id+" "+test);
                var lol = parsed.items[song].added_by.id
                fs.appendFileSync('./Output.txt', "\n"+lol);
            } 
            downloadJson(recurser)
            //console.log(parsed.items)           
        }
    })
}

downloadJson(recurser)