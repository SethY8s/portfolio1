const { request } = require('express');
const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
require('dotenv').config();



const PORT = process.env.PORT || 5000;

//Middleware
app.use(express.static('public'));
app.use(express.json())

app.get('/', (req, res)=>{
    res.sendFile(__dirname  + '/public/index.html')
})


app.post('/', (req, res)=>{
    console.log(req.body)

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.user,
            pass: process.env.pass  
        }
    })

    const mailOptions = {
        from: req.body.email,
        to: process.env.user,
        subject: `message from ${req.body.email}: ${req.body.subject}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.log(error);
            res.send('error')
        }else{
            console.log('Email Sent ' + info.response);
            res.send('success')
        }
    })
})

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})