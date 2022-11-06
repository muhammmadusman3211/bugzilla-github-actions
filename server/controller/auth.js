const jwt = require("jsonwebtoken")
const OtpModel = require("../model/otpModel")
const UserModel = require("../model/userModel")
const transporter = require("./mailer")
const bcrypt = require("bcrypt")

const registration = async (req, res, next) => {
  try {
    const user = await UserModel.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    })

    return res.status(200).json({
      status: "ok",
      data: user,
      messages: "User has been registered successfully",
    })
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email })

    if (!user) {
      return res.status(200).json({ status: "error", error: `User not found` })
    }

    const validate = await user.isValidPassword(req.body.password)

    if (!validate) {
      return res.status(200).json({ status: "error", error: "Wrong Password" })
    }

    const token = jwt.sign({ user: user }, process.env.SECRET_KEY)

    return res.status(200).json({
      status: "ok",
      data: { token: token, user: user },
      messages: "User has been logged in successfully",
    })
  } catch (error) {
    return next(error)
  }
}

const sendEmail = async (req, res, next) => {
  try {
    let validEmail = await UserModel.findOne({ email: req.body.email })

    if (validEmail) {
      let otp = Math.floor(Math.random() * 1000000 + 1)

      const otpData = await OtpModel.create({
        email: req.body.email,
        code: otp,
        expireIn: new Date().getTime() + 300 * 1000,
      })

      await transporter.sendMail({
        from: process.env.EMAIL,
        to: req.body.email,
        subject: "Change your Password",
        text: `Your otp is ${otp}`,
        html: "",
      })

      res.json(
        res.status(200).json({
          status: "ok",
          data: otpData,
          messages: "Email has been sent successfully",
        })
      )
    } else {
      res.json(
        res.status(404).json({
          status: "error",
          errors: "Email does not exist",
        })
      )
    }
  } catch (error) {
    next(error)
  }
}

const changePassword = async (req, res, next) => {
  try {
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
        res.json(
          res.status(200).json({
            status: "ok",
            data: user,
            messages: "Password has been updated",
          })
        )
      } else {
        res.json(
          res.status(404).json({
            status: "error",
            errors: "User does not exist",
          })
        )
      }
    } else
      res.json(
        res.status(401).json({
          status: "error",
          errors: "OTP is wrong",
        })
      )
  } catch (error) {
    next(error)
  }
}

const logout = function (req, res) {
  //destroy jwt token
  res.json(
    res.status(200).json({
      status: "ok",
      messages: "Logout Succesfull",
    })
  )
}

module.exports = {
  registration,
  login,
  sendEmail,
  changePassword,
  logout,
}
