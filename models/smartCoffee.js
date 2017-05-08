const mongoose = require('mongoose');

const coffeeSchema = new mongoose.Schema({
    name: String,
    isOn: Boolean,
    log: Array

}, { timestamps: true });


const smartCoffee = mongoose.model('smartCoffee', coffeeSchema);

smartCoffee.find(function (err, data) {
    if (data.length) {
        console.log("Coffeedata available");
        return;
    }
    new smartCoffee({
        name: "Senseo",
        isOn : false,


    }).save();


    console.log("Added Coffeedata");
});
module.exports = smartCoffee;
