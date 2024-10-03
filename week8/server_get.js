const express = require('express');
const mongoose = require('mongoose');
const calculationRoutes = require('./routes/calculationRoutes');
const http = require('http');
const socketIo = require('socket.io');

const app = express();

// Connect to MongoDB
const mongoUri = 'mongodb+srv://soorajwork6:95emFFiHs6NXM5yO@cluster0.fmllqjy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoUri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('Error connecting to MongoDB', error));

// Setup HTTP server and Socket.IO
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', calculationRoutes);

app.get('/serverError', (req, res) => {
    // Simulate a server error
    res.status(500).send("Internal Server Error");
});


io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });

    socket.on('calculate', (data) => {
        console.log('Calculation request received:', data);
       
        const { n1, n2, operation } = data;
        let result;
        switch(operation) {
            case 'add':
                result = n1 + n2;
                break;
            case 'subtract':
                result = n1 - n2;
                break;
            case 'multiply':
                result = n1 * n2;
                break;
            case 'divide':
                result = n2 !== 0 ? n1 / n2 : 'Error: Division by zero';
                break;
            default:
                result = 'Error: Invalid operation';
        }
        console.log('Calculation result:', result);
  
        socket.emit('calculationResult', { result });
    });
});

server.listen(3040, () => {
    console.log('Server is listening on port 3040');
});
