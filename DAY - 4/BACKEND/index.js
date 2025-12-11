const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


app.use(express.json());
const cors = require('cors');
app.use(cors());
mongoose.connect("mongodb+srv://harikarthikvajravel12_db_user:harikarthik123@cluster0.w9fwj2q.mongodb.net/FoodDB")
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));


const Food = require('./MODELS/Food');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_please_change';

function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Missing Authorization header' });
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ error: 'Invalid Authorization format' });
    const token = parts[1];
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = payload;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}

app.post('/login', (req, res) => {
    const { username, password } = req.body || {};
    if (!username || !password) return res.status(400).json({ error: 'username and password required' });
    if (username === 'giri' && password === '123') {
        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '2h' });
        return res.json({ token });
    }

    return res.status(401).json({ error: 'Invalid credentials' });
});

app.get('/', (req, res) => {
    res.send("hello");
});

app.post('/insert',async(req,res)=>{
    const foodName = req.body.foodName;
    const price = req.body.price;
    const food = new Food({
        foodName: foodName,
        price: price
    });

    try{
        await food.save();
        console.log("FOOD SAVED")
        return res.status(201).json({ message: "Food saved", food });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
})

app.get('/read', authenticate, async (req, res) => {
    try {
        const foods = await Food.find();
        return res.json(foods);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
});

app.put('/update',async(req,res)=>{
    const newFoodName = req.body.newFoodName;
    const newPrice = req.body.newPrice;
    const foodId = req.body.foodId;

    try{
        await Food.findByIdAndUpdate(foodId,{foodName:newFoodName,price:newPrice});
        console.log("FOOD UPDATED");
        return res.json({ message: "Food updated" });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
})

app.listen(port, () => {
    console.log(`running on port ${port}`);
});
