const express = require("express")
const passport = require("passport")
const bodyParser = require("body-parser")
const cors = require("cors")

const { checkIsInRole, getRedirectUrl } = require("./auth/utils")
const ROLES = require("./utils/roles")
const db = require("./model/db")
const path = require("path")
const routes = require("./modules/auth/routes")
const projectRoutes = require("./modules/projects/projectRoutes")
const bugRoutes = require("./modules/bugs/bugRoutes")

require("./auth/auth")

const app = express()

app.use(cors())
app.use(bodyParser.json({ extended: false }))

app.use("/", routes)
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.use(
  "/projects",
  passport.authenticate("jwt", { session: false }),
  projectRoutes
)

app.use("/bug", passport.authenticate("jwt", { session: false }), bugRoutes)

app.use(function (err, req, res, next) {
  console.log("here")
  res.status(500).json({ error: err })
})

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))
}
app.listen(process.env.PORT || 3000, () => {
  console.log("Server started.")
})
