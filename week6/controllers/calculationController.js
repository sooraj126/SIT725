
const Calculation = require('../models/calculation');


exports.addTwoNumber = async (req, res) => {
    try {
        const n1 = parseInt(req.query.n1);
        const n2 = parseInt(req.query.n2);
        if (isNaN(n1) || isNaN(n2)) {
            return res.status(400).json({ statuscode: 400, message: 'Invalid numbers' });
        }
        const result = n1 + n2;
        const calculation = new Calculation({ number1: n1, number2: n2, operation: '+', result });
        await calculation.save();
        res.json({ statuscode: 200, data: result });
    } catch (error) {
        res.status(500).json({ statuscode: 500, message: 'Error performing addition', error });
    }
};


exports.subtractTwoNumber = async (req, res) => {
    try {
        const n1 = parseInt(req.query.n1);
        const n2 = parseInt(req.query.n2);
        if (isNaN(n1) || isNaN(n2)) {
            return res.status(400).json({ statuscode: 400, message: 'Invalid numbers' });
        }
        const result = n1 - n2;
        const calculation = new Calculation({ number1: n1, number2: n2, operation: '-', result });
        await calculation.save();
        res.json({ statuscode: 200, data: result });
    } catch (error) {
        res.status(500).json({ statuscode: 500, message: 'Error performing subtraction', error });
    }
};


exports.multiplyTwoNumber = async (req, res) => {
    try {
        const n1 = parseInt(req.query.n1);
        const n2 = parseInt(req.query.n2);
        if (isNaN(n1) || isNaN(n2)) {
            return res.status(400).json({ statuscode: 400, message: 'Invalid numbers' });
        }
        const result = n1 * n2;
        const calculation = new Calculation({ number1: n1, number2: n2, operation: '*', result });
        await calculation.save();
        res.json({ statuscode: 200, data: result });
    } catch (error) {
        res.status(500).json({ statuscode: 500, message: 'Error performing multiplication', error });
    }
};


exports.divideTwoNumber = async (req, res) => {
    try {
        const n1 = parseInt(req.query.n1);
        const n2 = parseInt(req.query.n2);
        if (isNaN(n1) || isNaN(n2)) {
            return res.status(400).json({ statuscode: 400, message: 'Invalid numbers' });
        }
        const result = n2 !== 0 ? n1 / n2 : 'Cannot divide by zero';
        const calculation = new Calculation({ number1: n1, number2: n2, operation: '/', result });
        await calculation.save();
        res.json({ statuscode: 200, data: result });
    } catch (error) {
        res.status(500).json({ statuscode: 500, message: 'Error performing division', error });
    }
};


exports.getHistory = async (req, res) => {
    try {
        const history = await Calculation.find();
        res.json(history);
    } catch (error) {
        res.status(500).json({ statuscode: 500, message: 'Error retrieving history', error });
    }
};
