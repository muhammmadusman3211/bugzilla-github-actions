const passport = require("passport")
const jwt = require("jsonwebtoken")
const OtpModel = require("../../model/otpModel")
const UserModel = require("./userModel")
const transporter = require("./mailer")
const bcrypt = require("bcrypt")

const registration = async (req, res, next) => {
  res.json({
    message: "Signup successful",
    user: req.user,
  })
}

const login = async (req, res, next) => {
  passport.authenticate("login", async (err, user, next) => {
    try {
      if (err || !user) {
        const error = new Error("An error occurred.")

        return res.status(401).json({
          message: next.message,
        })
      }

      req.login(user, { session: false }, async (error) => {
        console.log("here", err)
        if (error) return next(error)

        const body = {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        }
        const token = jwt.sign({ user: body }, "TOP_SECRET")

        return res.json({ body: body, token: token })
      })
    } catch (error) {
      return next(error)
    }
  })(req, res, next)
}

const sendEmail = async (req, res, next) => {
  console.log(req.body)
  let validEmail = await UserModel.findOne({ email: req.body.email })
  if (validEmail) {
    let otp = Math.floor(Math.random() * 1000000 + 1)
    const otpData = await OtpModel.create({
      email: req.body.email,
      code: otp,
      expireIn: new Date().getTime() + 300 * 1000,
    })
    let info = await transporter.sendMail({
      from: process.env.EMAIL, // sender address
      to: req.body.email, // list of receivers
      subject: "Change your Password", // Subject line
      text: `Your otp is ${otp}`, // plain text body
      html: "", // html body
    })
    res.json({
      message: "You have received a code in your email",
      otpData,
    })
  } else {
    res.json({
      message: "Email does not exist",
    })
  }
}

const changePassword = async (req, res, next) => {
  console.log(req.body)
  let otp = await OtpModel.findOne({
    email: req.body.email,
    code: req.body.otp,
  })
  if (otp) {
    let user = await UserModel.findOne({ email: req.body.email })
    const hash = await bcrypt.hash(req?.body?.password, 10)

    if (user) {
      await UserModel.findOneAndUpdate(
        {
          email: req.body.email,
        },
        {
          password: hash,
        }
      )
      res.json({
        message: "password is changed",
      })
    } else {
      res.json({
        message: "User does not exist",
      })
    }
  } else
    res.json({
      message: "Otp is wrong",
    })
}

const logout = function (req, res, next) {
  req.logout((err) => {
    return next(err)
  })
  res.send("Logout Successfull")
}

module.exports = {
  registration,
  login,
  sendEmail,
  changePassword,
  logout,
}
