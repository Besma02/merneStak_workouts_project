require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose')
const workouts=require('./routes/workouts')
const user=require('../backend/routes/user')
const app=express()
app.use(express.json())
app.use('/api/workouts/',workouts)
app.use('/api/user/',user)

mongoose.connect(process.env.URI)
.then(()=>{
    app.listen(process.env.PORT,(req,res)=>{
        console.log('runing on port & connecting to db',process.env.PORT)
    })
})
.catch(error=>console.log('error'))


