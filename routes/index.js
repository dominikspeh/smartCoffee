const express = require('express');
const router = express.Router();
const coffee = require('../modules/smartCoffee');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });


});

router.get('/coffee/turnPower', function(req, res, next) {
    req.app.io.emit('send:turnCoffee', {});

    coffee.turnPower();
    res.render('index', { title: 'Turn Power' });
});
router.get('/coffee/brew', function(req, res, next) {
    req.app.io.emit('send:makeCoffee', {});
    coffee.makeCoffee();
    res.render('index', { title: 'Make Coffee' });
});
router.get('/coffee/status', function(req, res, next) {
    coffee.getStatus().then(data => {
        res.json(data);
    });
});
router.get('/coffee/activities', function(req, res, next) {

    coffee.getActivities().then(data => {
        res.json(data);
    });
});
router.get('/coffee/activities/day', function(req, res, next) {
    coffee.getActivitiesByDay().then(data => {
        console.log(data);
        res.json(data);
    });
});
router.get('/coffee/count', function(req, res, next) {
    coffee.countCoffees().then(data => {
        res.json(data);
    });
});

module.exports = router;
