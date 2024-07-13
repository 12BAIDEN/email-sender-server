const express = require('express');
const app = express();
const nodemailer = require('nodemailer');

const PORT = process.env.PORT || 5000;

//Middleware
app.use(express.static('views'));
app.use(express.json())

app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/views/contact.html')
})
 
app.post('/', (req, res)=>{
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user: 'chriscollinsb911@gmail.com',
            pass: 'ujeybxymzwdewdhn'
        }
    }); 

    const mailOptions = {
        from: req.body.email,
        to: 'chriscollinsb911@gmail.com',
        subject: `Message from ${req.body.email}:
         ${req.body.subject}`,
       text: req.body.message
    };

    transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.log(error);
            res.send('error');
        } else {
            console.log('Email sent:' + info.response);
            res.send('success');
        }
    })
});


app.listen(PORT, ()=>{
    console.log('server running on port ${PORT}')
})