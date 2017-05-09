const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    action: String,

}, { timestamps: true });


const activities = mongoose.model('coffeeActivities', activitySchema);

module.exports = activities;
