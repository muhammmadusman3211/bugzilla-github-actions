const mongoose = require('mongoose')

const Schema = mongoose.Schema

const OtpSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email cannot be empty'],
  },
  code: {
    type: String,
    required: [true, 'Code is required'],
  },
})

const OtpModel = mongoose.model('otp', OtpSchema)

module.exports = OtpModel
