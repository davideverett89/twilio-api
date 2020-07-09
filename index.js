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

app.post('/send', jsonParser, (req, res, next) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'davideverett1989@gmail.com',
      pass: 'undertow93$',
    }
  })
  const mailOptions = {
    from: process.env.EMAIL,
    to: req.body.sendEmail,
    subject: req.body.name,
    text: req.body.message,
  }
  transporter.sendMail(mailOptions, (err, res) => {
    if (err) {
      console.error('There was an error sending this message:', err);
    } else {
      console.log('Here is the response:', res);
    }
  })
  .then(() => res.sendStatus(200))
  .catch(() => res.sendStatus(500));
});



app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

