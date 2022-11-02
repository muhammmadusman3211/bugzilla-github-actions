const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const Schema = mongoose.Schema

const OtpSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  expireIn: {
    type: Number,
  },
})

const OtpModel = mongoose.model("otp", OtpSchema)

module.exports = OtpModel
