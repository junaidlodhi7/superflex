require('dotenv').config();
const nodemailer = require('nodemailer');
const from       = process.env.EMAIL;
const password   = process.env.PASSWORD;

function sendMail(mailOptions , cb )
{
    mailOptions.from =  from;
    // create reusable transport method (opens pool of SMTP connections)
    var smtpTransport = nodemailer.createTransport({
        // service: "gmail",
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: 465,
        secure: true, // use SSL
        auth: {
            user: from,
            pass: password
        }
    });
    smtpTransport.sendMail(mailOptions, cb);
}
module.exports = {
    sendMail: sendMail
};