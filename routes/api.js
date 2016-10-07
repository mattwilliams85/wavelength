var express = require('express')
var request = require('request')
var router = express.Router();

var base = 'https://api.spotify.com/v1/';
var genreLimit = 5;
var token;

router.get('/genres', function(req, res, next) {
  token = req.session.access_token;
  console.log(token)
  // token = 'BQCyNon7lF2wwJAySZuHuelsyJQWLGk-6OqEcz-GISvs2yLJ1nDbT9ee5IlzohswWHPteTxU5StwfYimfQYeIz30RH2JucyttZN2cSu_bHfYjwkDbv6gr2whSDJF-WjZqCWRbBuNlr-_Ycx_b40NT61H98dOZN01fdC26pp2i7bV4iI4Qh_1foCEVQg'
  var options = {
    url: base + 'me/top/artists?limit=50',
    headers: {
      'Authorization' : 'Bearer ' + token
    },
    json: true
  };
  request.get(options, function(error, response, body) {
    if (error || !body) return res.send(400);
    getGenres(body.items)
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

// function getArtistIds(data) {
//   var tracks = data.items;
//   console.log(tracks.length)
//   var idArray = [];
//   for (var i = 0; i < tracks.length; i++) {
//     var id = tracks[i].track.artists[0].id;
//     if (idArray.indexOf(id) === -1) idArray.push(id);
//   }
//   getArtists(idArray);
// }

function getGenres(artists) {
  // console.log(artists)
  var genreArray = []
  for (var i = 0; i < artists.length; i++) {
    console.log(artists[i].genres)
    artists[i].genres.forEach(function (item) {
      genreArray.push(item)
    })
  }
  
  var topGenres = countGenres(genreArray);
  console.log(sortByVal(topGenres).slice(0,10))
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

// function getArtists(idArray) {
//   var options = {
//     url: base + 'artists?ids=' + idArray.join(','),
//     headers: {
//       'Authorization' : 'Bearer ' + token
//     },
//     json: true
//   };

//   request.get(options, function(error, response, body) {
//     getGenres(body.artists)
//   });
// }

module.exports = router;
