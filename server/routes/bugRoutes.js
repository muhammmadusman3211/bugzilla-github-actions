const express = require("express")
const ROLES = require("../utils/roles")

const multer = require("multer")
const { uuid } = require("uuidv4")
const { checkIsInRole } = require("../auth/utils")
const { authorizeRoute } = require("../controller/authorizeRoute")
const createBugController = require("../controller/createBugController")
const updateBugController = require("../controller/updateBugController")
const assignBugController = require("../controller/assignBugController")
const router = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/")
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-")
    cb(null, uuid() + "-" + fileName)
  },
})

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/gif") {
      cb(null, true)
    } else {
      cb(null, false)
      return cb(new Error("Only .png and .gif format allowed!"))
    }
  },
})
router.post("/authorize", authorizeRoute)

router.put(
  "/update/status",
  checkIsInRole(ROLES.Developer),
  updateBugController
)

router.put(
  "/update/assign",
  checkIsInRole(ROLES.Developer),
  assignBugController
)

router.post(
  "/create",
  checkIsInRole(ROLES.Qa),
  upload.single("file"),
  createBugController
)

module.exports = router
