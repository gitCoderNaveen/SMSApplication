const express = require('express')
const clintDatas = require('./Routes/clientrouter')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

app.use(cors())

app.use(express.json())

mongoose.connect('mongodb+srv://smsuser:smsdbclient@smscluster.x74rz.mongodb.net/SmsClients')

mongoose.connection.on('connected', ()=>{
    console.log('mongodb connected successfully')
})

app.get('/', (req,res)=>{
    res.send("SMS Backend Server")
})

app.use('/clients', clintDatas)

app.listen(8001, ()=>{
    console.log('Server running on port 8001')
})
