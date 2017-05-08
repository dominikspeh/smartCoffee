const Gpio = require('onoff').Gpio;
const power = new Gpio(17, 'out');
const brewing = new Gpio(18, 'out');
const smartCoffee = require('../models/smartCoffee');

function turnPower() {
    return new Promise(resolve => {
        power.write(1, function () {
            power.writeSync(0);

            smartCoffee.findOne({}, {}, { sort: { 'created_at' : 1 } }, function(err, result) {
                let status ;
                console.log(result)
                if(result.isOn){
                    status = false;
                }
                else {
                    status = true
                }

                smartCoffee.update({_id: result._id}, {
                    $set: {
                        isOn: status
                    }
                }).then(result => {

                    if(status){
                        logActivty('Power on').then(function () {
                            resolve(result);

                        })
                    }
                    else {
                        logActivty('Power off').then(function () {
                            resolve(result);

                        })
                    }
                })
            });
        })
    });

}

function makeCoffee() {
    return new Promise(resolve => {
        brewing.write(1, function () {
            console.log("Make Coffee");
            brewing.writeSync(0);
            logActivty('Coffee made').then(function () {
                resolve();
            })

        })
    });
}

function getStatus(){
    return new Promise((resolve, reject) => {
        smartCoffee.findOne({}, {}, { sort: { 'created_at' : 1 } }, function(err, result) {
            resolve(result);
        });
    })
}

function logActivty(type){

    return new Promise((resolve, reject) => {
        let activity = {
            time: Date.now(),
            action: type
        };
        console.log(activity);

        smartCoffee.findOne({}, {}, { sort: { 'created_at' : 1 } }, function(err, result) {
            result.log.push(activity);
            result.save().then(result => {
                resolve();
            })
        });

    })
}

module.exports = {
    turnPower,
    makeCoffee,
    getStatus
};