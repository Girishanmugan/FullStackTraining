const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const { default: mongoose } = require('mongoose');

mongoose.connect('mongodb+srv://giri:giri@cluster0.iwgjnks.mongodb.net/')

const UserSchema = new mongoose.Schema({
    username:{
        type : String,
        required : true,
        unique : true
    },

    password: {
        type : String,
        requried : true
    }
});

const user = mongoose.model('User',UserSchema)

const foodSchema = new mongoose.Schema ({
    name:{
        type : string,
        required : true
    },
    daySinceIAte:{
        type : Number,
        required : true
    },
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
});

const food = mongoose.model('Food' , foodSchema)

application.post('/api/register' , async(req,res) => {
    const {username , password } = req.body;
    const hashedPassword = await bcrypt.hash(password,10)
    const user = new User({username , password:hashedPassword})
});

app.post('/api/login' , async(req , res ) => {
    try {
        const { username , password } = req.body;
        const user = await User.findOne({username});
        if (!user) {
            return res.status(400).send("Invalid credentials");
        }

        const isPasswordValid = await bcrypt.compare(password , user.password);
        if ( !isPasswordValid ) {
            return res.status(400).send("Invalid crendentials");
        }

        const token = jwt.sign({ userId : user._id} , 'your_jwt_secret' , {expiresIn: '1h'})
    }
});

app.post('/api/food' , verifytoken , async (req , res) => {
    try {
      
        const ( name , daySinceIAte )
    }
})

const app = express();
