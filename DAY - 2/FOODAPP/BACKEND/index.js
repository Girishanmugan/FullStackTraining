const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('mongoose');


app.use(express.json());
mongoose.connect("mongodb+srv://harikarthikvajravel12_db_user:harikarthik123@cluster0.w9fwj2q.mongodb.net/FoodDB")
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));


const Food = require('./models/Food');

//sample test
app.get('/', (req, res) => {
    res.send("hello");
});

//add
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
    }
    catch(err){
        console.log(err);
    }
})



//print
app.get('/read',async(req,res)=>{
    try{
        const foods = await Food.find();
        res.json(foods);
    }
    catch(err){
        console.log(err);
    }
})


//modify
app.put('/update',async(req,res)=>{
    const newFoodName = req.body.newFoodName;
    const newPrice = req.body.newPrice;
    const foodId = req.body.foodId;

    try{
        await Food.findByIdAndUpdate(foodId,{foodName:newFoodName,price:newPrice});
        console.log("FOOD UPDATED");
    }
    catch(err){
        console.log(err);
    }
})





app.listen(port, () => {
    console.log(`running on port ${port}`);
});
