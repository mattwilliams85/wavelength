var express = require('express')
var request = require('request')
var router = express.Router();

var base = 'https://api.spotify.com/v1/';
var genreLimit = 5;
var token;
var topTen;

router.get('/genres', function(req, res, next) {
  token = req.session.access_token;
  var options = {
    url: base + 'me/top/artists?limit=50',
    headers: {
      'Authorization' : 'Bearer ' + token
    },
    json: true
  };
  request.get(options, function(error, response, body) {
    if (body.error || error) {
      console.log(body.error)
    } else {
      topTen = getGenres(body.items)
      res.send(JSON.stringify(topTen.splice(0,genreLimit)));
    }
  });
});

function sortByVal(obj) {
  var array = [];
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) array.push({
      name: key,
      count: obj[key]
    });
  }

  array.sort(function(a,b) {
    var x = obj[a.name];
    var y = obj[b.name];

    if (x > y) return -1;
    if (x < y) return 1;
    return 0;
  });

  return array;
};

function getGenres(artists) {
  var genreArray = []
  for (var i = 0; i < artists.length; i++) {
    artists[i].genres.forEach(function (item) {
      genreArray.push(item)
    })
  }
  
  var topGenres = countGenres(genreArray);
  return sortByVal(topGenres).slice(0,10)
}

function countGenres(genreArray) {
  var genres = {};
  genreArray.sort();
  for (var i = 0; i < genreArray.length; i++) {
    var name = genreArray[i];
    genres[name] = typeof genres[name] !== "undefined" ? genres[name] + 1 : 1;
  }
  return genres
}

module.exports = router;
