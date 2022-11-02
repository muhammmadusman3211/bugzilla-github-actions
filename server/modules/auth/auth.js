const passport = require("passport")
const jwt = require("jsonwebtoken")

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

const logout = function (req, res, next) {
  req.logout((err) => {
    return next(err)
  })
  res.send("Logout Successfull")
}

module.exports = {
  registration,
  login,
  logout,
}
