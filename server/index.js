const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const users = require('./routes/User') 

dotenv.config()


app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 5000 

app.use('/',users);

mongoose.connect(process.env.MONGO_URL,{useUnifiedTopology: true,
        useNewUrlParser: true}).then(() => {
    console.log('MongoDB connection established Successfully')
})

app.listen(PORT,() => {
    console.log('Server is reunning on PORT',PORT);
})