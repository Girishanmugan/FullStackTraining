const express = require("express")
    const app = express()
   

    app.use(express.json());
    require("dotenv").config()

    //get port number form env
    const port = process.env.PORT

    app.get('/',(req,res)=>{
        res.send('Welcome you all to this page')
       
    })

    app.get('/users',(req,res)=>{
        res.send("hello user")
    })

    app.get('/users/:userID',(req,res)=>{

        const userID = req.params.userID;
        res.send(`user ID is : ${userID}`)
    })

    app.get('/users/:userID/:name/:age/profile',(req,res)=>{
        const userId = req.params.userID
        const name = req.params.name
        const age = req.params.age
        res.send(`profile of user${userId} , ${name} , ${age}`)
    })

    app.listen(port, () =>{
        console.log("listenning at 3000")
    })