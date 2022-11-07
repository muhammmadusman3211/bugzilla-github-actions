const { body, validationResult } = require("express-validator")

exports.registrationSchema = [
  body("name", "Please enter a name").isLength({ min: 1 }),
  body("email", "Email is not valid").isEmail(),
  body(
    "password",
    "Password is not valid. It should be greater than 5 letters "
  ).isLength({ min: 5 }),
  body("role", "Please enter a valid role").isIn([
    "manager",
    "developer",
    "qa",
  ]),
]

exports.loginSchema = [
  body("email", "Email is not valid").isEmail(),
  body(
    "password",
    "Password is not valid. It should be greater than 5 letters "
  ).isLength({ min: 5 }),
]

exports.sendEmailSchema = [body("email", "Email is not valid").isEmail()]

exports.changePasswordSchema = [
  body("email", "Email is not valid").isEmail(),
  body(
    "password",
    "Password is not valid. It should be greater than 5 letters "
  ).isLength({ min: 5 }),
]

exports.createProjectSchema = [
  body("title", "Please enter a Title").isLength({ min: 1 }),
]

exports.validateSchemas = (req, res, next) => {
  const errors = validationResult(req).array()
  if (!errors.length) return next()
  else
    return res.status(200).json({
      status: "error",
      error: errors[0].msg,
    })
}
