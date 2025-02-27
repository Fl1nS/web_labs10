const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const CarSchema = new mongoose.Schema({
    img: String,
    title: String,
    description: String,
    price: Number,
    power: Number
});

const Car = mongoose.model('Car', CarSchema, 'Car');

const URL = 'mongodb+srv://StrutynskyiN:12345@backenddb.8k1yz.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB';

mongoose
    .connect(URL)
    .then(() => console.log('Connect to MongoDB'))
    .catch((err) => console.log(`DB connection error: ${err}`));

app.get('/cars', async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (error) {
        res.status(500).json({ message: 'Помилка завантаження даних' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening port ${PORT}`)
});