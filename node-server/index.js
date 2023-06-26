const express = require('express')
const cors = require('cors')
const connectDB = require('./config/connectDB')
const User=require('./model/User')
const axios = require('axios')
const { get } = require('mongoose')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const app = express()
const port = process.env.PORT_NUMBER || 8000

// Middleware to parse JSON from request body
app.use(express.json());
app.use(cors());
connectDB()

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/api/register', async (req, res) => {
    console.log(req.body)
    try{

        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        res.json({status: 'ok'})

    }catch(err){
        res.json({status: 'error',err: err.message})
        
    }

})

app.get('/api/quote',async(req, res)=>{
    try{
        const token=req.headers['x-access-token']
        const decoded=jwt.verify(token,'secret123')
        const email=decoded.email
        const user=await User.findOne({email:email})
        return res.json({status: 'ok', quote: user.quote})
    }catch(err){
        console.log(err)
        return res.json({status: 'error',error: err.message})
    }

})


app.post('/api/quote',async(req, res)=>{
    try{
        const token=req.headers['x-access-token']
        const decoded=jwt.verify(token,'secret123')
        const email=decoded.email
        const user=await User.updateOne({email: email},{$set:{quote:req.body.quote}})
        console.log("called me")
        return {status: 'ok', quote: user.quote}
    }catch(err){
        console.log(err)
        res.json({status: 'error',err: err.message})
    }

})


app.post('/api/login',async(req, res)=>{
    try{
        const user = await User.findOne({
            email:req.body.email,
            password:req.body.password
        })

        if(user){
            const token=jwt.sign({
                name: user.name,
                email:user.email
            },'secret123')
            return res.json({status:'ok', user:token})
        }else{
            return res.json({status:'error', user:false})
        }
    }catch(err){
        res.json({status: 'error',err: err.message})
    }

})

app.get('/quotes-server',async (req, res) => {
    const getQuotes=async()=>{
        try{
            const response=await axios.get('https://zenquotes.io/api/quotes/')
            console.log(response.data)
            return response.data
        }catch(err){
            throw new Error(err)
        }
    }
    return res.json(await getQuotes())
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))