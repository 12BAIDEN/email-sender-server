const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const path = require('path');

const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

app.post('/api/send-email', (req, res) => {
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'chriscollinsb911@gmail.com',
            pass: 'ujeybxymzwdewdhn'
        }
    });

    const mailOptions = {
        from: req.body.email,
        to: 'chriscollinsb911@gmail.com',
        subject: `Message from ${req.body.email}: ${req.body.subject}`,
        text: req.body.message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ status: 'error', message: error.toString() });
        } else {
            console.log('Email sent: ' + info.response);
            return res.status(200).json({ status: 'success', message: 'Email sent' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
