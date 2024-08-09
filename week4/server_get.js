const express = require('express');
const mongoose = require('mongoose');
const Calculation = require('./table_format/calculations'); 

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const addTwoNumber = (n1, n2) => n1 + n2;
const subtractTwoNumber = (n1, n2) => n1 - n2;
const multiplyTwoNumber = (n1, n2) => n1 * n2;
const divideTwoNumber = (n1, n2) => n2 !== 0 ? n1 / n2 : 'Cannot divide by zero';


const mongoUri = 'mongodb+srv://soorajwork6:95emFFiHs6NXM5yO@cluster0.fmllqjy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';


mongoose.connect(mongoUri)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB', error);
    });


app.get('/addTwoNumber', async (req, res) => {
    try {
        const n1 = parseInt(req.query.n1);
        const n2 = parseInt(req.query.n2);
        if (isNaN(n1) || isNaN(n2)) {
            return res.status(400).json({ statuscode: 400, message: 'Invalid numbers' });
        }
        const result = addTwoNumber(n1, n2);
        const calculation = new Calculation({ number1: n1, number2: n2, operation: '+', result });
        await calculation.save();
        res.json({ statuscode: 200, data: result });
    } catch (error) {
        res.status(500).json({ statuscode: 500, message: 'Error performing addition', error });
    }
});

app.get('/subtractTwoNumber', async (req, res) => {
    try {
        const n1 = parseInt(req.query.n1);
        const n2 = parseInt(req.query.n2);
        if (isNaN(n1) || isNaN(n2)) {
            return res.status(400).json({ statuscode: 400, message: 'Invalid numbers' });
        }
        const result = subtractTwoNumber(n1, n2);
        const calculation = new Calculation({ number1: n1, number2: n2, operation: '-', result });
        await calculation.save();
        res.json({ statuscode: 200, data: result });
    } catch (error) {
        res.status(500).json({ statuscode: 500, message: 'Error performing subtraction', error });
    }
});

app.get('/multiplyTwoNumber', async (req, res) => {
    try {
        const n1 = parseInt(req.query.n1);
        const n2 = parseInt(req.query.n2);
        if (isNaN(n1) || isNaN(n2)) {
            return res.status(400).json({ statuscode: 400, message: 'Invalid numbers' });
        }
        const result = multiplyTwoNumber(n1, n2);
        const calculation = new Calculation({ number1: n1, number2: n2, operation: '*', result });
        await calculation.save();
        res.json({ statuscode: 200, data: result });
    } catch (error) {
        res.status(500).json({ statuscode: 500, message: 'Error performing multiplication', error });
    }
});

app.get('/divideTwoNumber', async (req, res) => {
    try {
        const n1 = parseInt(req.query.n1);
        const n2 = parseInt(req.query.n2);
        if (isNaN(n1) || isNaN(n2)) {
            return res.status(400).json({ statuscode: 400, message: 'Invalid numbers' });
        }
        const result = divideTwoNumber(n1, n2);
        const calculation = new Calculation({ number1: n1, number2: n2, operation: '/', result });
        await calculation.save();
        res.json({ statuscode: 200, data: result });
    } catch (error) {
        res.status(500).json({ statuscode: 500, message: 'Error performing division', error });
    }
});

app.get('/history', async (req, res) => {
    try {
        // console.log("hello")
        const history = await Calculation.find();
        // console.log(history)
        res.json(history);
    } catch (error) {
        res.status(500).json({ statuscode: 500, message: 'Error retrieving history', error });
    }
});

const port = 3040;
app.listen(port, () => {
    console.log("Server is listening on port " + port);
});
