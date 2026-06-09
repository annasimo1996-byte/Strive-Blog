const nodemailer = require("nodemailer")
require("dotenv").configDotenv()

const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
})

const sendEmail = async (
    to,
    subject,
    message
) => {
    try {
        const emailOptions = {
            from: "noreplay@test.com",
            to,
            subject,
            html: message
        }

        return await transporter.sendMail(emailOptions)
    } catch (e) {
        console.error(e)
        throw new Error("Impossible to send email, an error occurred")
    }
}

module.exports = sendEmail