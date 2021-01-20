// require('dotenv').config();
// const express = require('express');
// const nodemailer = require('nodemailer');
// const bodyParser = require('body-parser');
// const cron = require("node-cron");
// const fs = require("fs");
// const PORT = process.env.PORT || 5000;
// const app = express();

// const axios = require('axios');
// const moment = require('moment');

// const baseUrl = 'https://socially-distant-birthday.firebaseio.com';

// const jsonParser = bodyParser.json();
// const today = moment().format('YYYY-MM-DD');


// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// app.post('/sms', jsonParser, (req, res) => {
//   const accountSid = process.env.ACCOUNT_SID;
//   const authToken = process.env.AUTH_TOKEN;
//   const fromNumber = process.env.PHONE_NUM;
//   const toNumber = req.body.sendNumber;
//   const message = req.body.message;
//   const client = require('twilio')(accountSid, authToken);
//   client.messages
//   .create({
//      body: message,
//      from: fromNumber,
//      to: toNumber
//    })
//   .then(() => res.sendStatus(200))
//   .catch(() => res.sendStatus(500));
// });


// app.post('/send', jsonParser, (req, res) => {
//   const toEmail = req.body.sendEmail;
//   const subject = req.body.name;
//   const text = req.body.message;
//   const transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 587,
//     secure: false,
//     auth: {
//       user: process.env.EMAIL,
//       pass: process.env.PASSWORD,
//     }
//   })
//   const mailOptions = {
//     from: process.env.EMAIL,
//     to: toEmail,
//     subject,
//     text,
//   }
//   transporter.sendMail(mailOptions, (err, res) => {
//     if (err) {
//       console.error('There was an error sending this message:', err);
//     } else {
//       console.log('Here is the response:', res);
//     }
//   })
//   res.sendStatus(200);
// });

// const sendBirthdayEmail = (emails) => {
//   const toEmail = emails;
//   const subject = 'It\'s Your Birthday!';
//   const text = 'Come check out what your friends have to say!: https://socially-distant-birthday.firebaseapp.com';
//   const transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 587,
//     secure: false,
//     auth: {
//       user: process.env.EMAIL,
//       pass: process.env.PASSWORD,
//     }
//   })
//   const mailOptions = {
//     from: process.env.EMAIL,
//     to: toEmail,
//     subject,
//     text,
//   }
//   transporter.sendMail(mailOptions, (err, res) => {
//     if (err) {
//       console.error('There was an error sending this message:', err);
//     } else {
//       console.log('Here is the response:', res);
//     }
//   })
// }

// cron.schedule("* * * * *", () => {
//   getUserEmailsWithCurrentBirthday(today)
//     .then((emails) => {
//       if (emails.length > 0) {
//         sendBirthdayEmail(emails);
//       }
//     })
//     .catch((err) => console.error('There was an issue with getting today\'s birthday emails:', err));
// });

// const getBirthdays = () => new Promise((resolve, reject) => {
//   axios.get(`${baseUrl}/birthdays.json`)
//     .then((response) => {
//       const birthdayObject = response.data;
//       const birthdays = [];
//       if (birthdayObject !== null) {
//         Object.keys(birthdayObject).forEach((birthdayId) => {
//           birthdayObject[birthdayId].id = birthdayId;
//           birthdays.push(birthdayObject[birthdayId]);
//         });
//       }
//       resolve(birthdays);
//     })
//     .catch((err) => reject(err));
// });

// const getUsers = () => new Promise((resolve, reject) => {
//   axios.get(`${baseUrl}/users.json`)
//     .then((response) => {
//       const userObject = response.data;
//       const users = [];
//       if (userObject !== null) {
//         Object.keys(userObject).forEach((userId) => {
//           userObject[userId].id = userId;
//           users.push(userObject[userId]);
//         });
//       }

//       resolve(users);
//     })
//     .catch((err) => reject(err));
// });

// const getUserEmailsWithCurrentBirthday = (date) => new Promise((resolve, reject) => {
//   getBirthdays().then((birthdays) => {
//     getUsers().then((users) => {
//       const finalUserEmails = [];
//       const todaysBirthdays = birthdays.filter((x) => x.date === date);
//       todaysBirthdays.forEach((birthday) => {
//         const guestOfHonor = users.find((x) => x.id === birthday.guestOfHonorId);
//         finalUserEmails.push(guestOfHonor.email);
//       });
//       resolve(finalUserEmails);
//     });
//   })
//     .catch((err) => reject(err));
// });


// app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
