const express = require('express')
const {
  registrationSchema,
  validateSchemas,
  loginSchema,
  changePasswordSchema,
  sendEmailSchema,
} = require('../validations/schema')
const {
  registration,
  logout,
  login,
  sendEmail,
  changePassword,
} = require('../controller/auth')

const router = express.Router()

router.post('/registration', registrationSchema, validateSchemas, registration)

router.post('/send-email', sendEmailSchema, validateSchemas, sendEmail)

router.post(
  '/change-password',
  changePasswordSchema,
  validateSchemas,
  changePassword
)

router.post('/session', loginSchema, validateSchemas, login)

router.post('/logout', logout)

module.exports = router
