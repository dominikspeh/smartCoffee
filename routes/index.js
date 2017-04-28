var express = require('express');
var router = express.Router();
const coffee = require('../modules/smartCoffee');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/coffee/on', function(req, res, next) {
  coffee.turnPower();
  res.render('index', { title: 'Is On' });
});
router.get('/coffee/off', function(req, res, next) {
    coffee.turnPower();
    res.render('index', { title: 'Is Off' });
});
router.get('/coffee/turnPower', function(req, res, next) {
    coffee.turnPower();
    res.render('index', { title: 'Turn Power' });
});
router.get('/coffee/brew', function(req, res, next) {
    coffee.makeCoffee();
    res.render('index', { title: 'Make Coffee' });
});
module.exports = router;
