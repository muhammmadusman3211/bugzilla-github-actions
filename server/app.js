const express = require("express")
const passport = require("passport")
const bodyParser = require("body-parser")
const cors = require("cors")
const path = require("path")
const routes = require("./routes/routes")
const projectRoutes = require("./routes/projectRoutes")
const bugRoutes = require("./routes/bugRoutes")
const db = require("./model/index")

require("./auth/auth")

const app = express()

app.use(cors())

app.use(bodyParser.json({ extended: false }))

app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.use("/", routes)

app.use(
  "/projects",
  passport.authenticate("jwt", { session: false }),
  projectRoutes
)

app.use("/bug", passport.authenticate("jwt", { session: false }), bugRoutes)

app.use(function (err, req, res, next) {
  res.json(
    res.status(500).json({
      status: "error",
      error: err,
    })
  )
})

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))
}
app.listen(process.env.PORT || 3000, () => {
  console.log("Server started.")
})
