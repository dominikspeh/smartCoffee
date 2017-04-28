const Gpio = require('onoff').Gpio;
const power = new Gpio(17, 'out');
const brewing = new Gpio(18, 'out');

function turnPower() {
    return new Promise(resolve => {
        power.write(1, function () {
            console.log("Turn");
            power.writeSync(0);
            resolve();
        })
    });

}

function makeCoffee() {
    return new Promise(resolve => {
        brewing.write(1, function () {
            console.log("Make Coffee");
            brewing.writeSync(0);
            resolve();
        })
    });
}



module.exports = {
    turnPower,
    makeCoffee
};