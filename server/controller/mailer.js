const nodemailer = require("nodemailer")

// async..await is not allowed in global scope, must use a wrapper

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL, // generated ethereal user
    pass: process.env.SECRET_KEY, // generated ethereal password
  },
})

// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

module.exports = transporter
