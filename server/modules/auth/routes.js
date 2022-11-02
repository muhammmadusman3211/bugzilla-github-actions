const express = require("express")
const passport = require("passport")
const jwt = require("jsonwebtoken")
const { registration, logout, login } = require("./auth")

const router = express.Router()

router.post(
  "/registration",
  passport.authenticate("signup", { session: false }),
  registration
)

router.post("/session", login)

router.post("/logout", logout)

module.exports = router
