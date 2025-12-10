const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('mongoose');


mongoose.connect("mongodb+srv://giri:giri@cluster0.iwgjnks.mongodb.net/")
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));


const Food = require('./models/Food');


app.get('/', (req, res) => {
    res.send("hello");
});

app.put('/update',(req,res) => {
    res.send('updated the data successfully')
})

app.get('/read' , async(req,req) => {
    try{
        const 
    }
})

app.put('/update' , async(req,res) => {
    try{
        await 
    }
})


const food = new Food({
    foodName: "CHICKEN RICE",
    price: 500
});

food.save()
.then(() => console.log("FOOD SAVED"))
.catch((err) => console.log(err));

app.listen(port, () => {
    console.log(`running on port ${port}`);
});
