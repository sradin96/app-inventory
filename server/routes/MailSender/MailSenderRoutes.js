const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const mailSenderController = require('./MailSenderController');

router.post('/send-email', mailSenderController.sendMail);

module.exports = router;