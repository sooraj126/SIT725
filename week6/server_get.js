const express = require('express');
const mongoose = require('mongoose');
const calculationRoutes = require('./routes/calculationRoutes');

const app = express();


// Connect to MongoDB
const mongoUri = 'mongodb+srv://soorajwork6:95emFFiHs6NXM5yO@cluster0.fmllqjy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoUri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('Error connecting to MongoDB', error));


app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', calculationRoutes);

const port = 3040;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
