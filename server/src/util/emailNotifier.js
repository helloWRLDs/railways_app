const nodemailer = require('nodemailer');
const logger = require('../logger');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});


const notify = async(receiverEmail, code) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: receiverEmail,
        subject: "Verify your account",
        text: `TESTING code=${code}`
    }
    transporter.sendMail(mailOptions)
        .catch(e => logger.error(`mail sending err: ${e}`))
}

module.exports = notify