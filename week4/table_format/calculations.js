const mongoose = require('mongoose');

const calculation2 = new mongoose.Schema({
    number1: Number,
    number2: Number,
    operation: String,
    result: Number,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Calculation', calculation2);
