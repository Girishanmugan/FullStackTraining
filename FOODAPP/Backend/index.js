const express = require('express')
const mongoose = require('mongoose')
const Food = require('./models/Food')
const app = express()
const PORT = process.env.port || 3000

app.use(cors());
app.use(express.json());

mongoose.connect('');