var express = require('express')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var user = req.session.user
  console.log(req.session)
  res.render('index', { title: 'Spotifly', user: user });
});

module.exports = router;
