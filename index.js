require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const app = express();

const jsonParser = bodyParser.json();


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/sms', jsonParser, (req, res) => {
  const accountSid = process.env.ACCOUNT_SID;
  const authToken = process.env.AUTH_TOKEN;
  const fromNumber = process.env.PHONE_NUM;
  const toNumber = req.body.sendNumber;
  const message = req.body.message;
  const client = require('twilio')(accountSid, authToken);
  client.messages
  .create({
     body: message,
     from: fromNumber,
     to: toNumber
   })
  .then(() => res.sendStatus(200))
  .catch(() => res.sendStatus(500));
});


app.post('/send', jsonParser, (req, res) => {
  const toEmail = req.body.sendEmail;
  const subject = req.body.name;
  const text = req.body.message;
  console.log('This email is going to:', toEmail);
  console.log('The subject of this email is:', subject);
  console.log('The text of this email is:', text);
  console.log(process.env.EMAIL)
  console.log(process.env.PASSWORD);
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    }
  })
  const mailOptions = {
    from: process.env.EMAIL,
    to: toEmail,
    subject,
    text,
  }
  transporter.sendMail(mailOptions, (err, res) => {
    if (err) {
      console.error('There was an error sending this message:', err);
    } else {
      console.log('Here is the response:', res);
    }
  })
  res.sendStatus(200);
});




app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

