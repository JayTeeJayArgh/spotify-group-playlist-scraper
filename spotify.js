var https = require("https");

exports.getPlaylistData = async function (playlistId, offset, limit, cookie, callback) {
    var opts = {
        hostname: "api.spotify.com",
        port: 443,
        path: `/v1/playlists/${playlistId}/tracks?offset=${offset}&limit=${limit}&additional_types=track%2Cepisode&market=US`,
        method: 'GET',
        headers: {
            'authorization': `Bearer ${cookie}`
        }
    }

    var req = https.request(opts, function (res) {
        var data = "";

        res.on('data', function (body) {
            data = data + body;
        });

        res.on('end', function () {
            callback(data)
        });
    });

    req.end();
};