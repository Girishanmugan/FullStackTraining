const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');


app.use(express.json());


mongoose.connect("mongodb+srv://harikarthikvajravel12_db_user:harikarthik123@cluster0.w9fwj2q.mongodb.net/TodoDB")

.then(()=>{
    console.log("MongoDB connected")

})
.catch((err)=>{
    console.log(err)
})


const Todo = require('./models/Todo');



app.get('/',(req,res)=>{
    res.send("TODO LIST APPLICATION")

})


app.get('/insert',async(req,res)=>{


    const todoName = req.body.todoName;
    const description = req.body.description;

    const todo = new Todo({
        todoName:todoName,
        description:description


    })

    try{
        await todo.save();
        console.log("TODO SAVED")

    }

    catch(err){
        console.log(err)
    }

})


app.get('/view',async(req,res)=>{
    try{
        const todos = await Todo.find();
        res.json(todos);
    }
    catch(err){

        console.log()
    }
})

app.put('/update', async (req, res) => {
    const newTodo = req.body.newTodo;
    const newDescription = req.body.newDescription;
    const todoId = req.body.todoId;

    try {
        await Todo.findByIdAndUpdate(
            todoId,
            { todoName: newTodo, description: newDescription }
        );♦

        console.log("TODO UPDATED");
        res.json({ message: "Todo updated successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Update failed" });
    }
});








app.listen(port,()=>{
    console.log("SERVER RUNNNING >........")
})