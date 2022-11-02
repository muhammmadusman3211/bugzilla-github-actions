const express = require("express")
const ROLES = require("../../utils/roles")

const { authorizeRoute } = require("../auth/authorizeRoute")
const createProjectController = require("../projects/createProjectsController")
const getDevelopersController = require("../../controller/getDevelopersController")
const editProjectsController = require("./editProjectController")
const deleteProjectsController = require("./deleteProjectController")
const getProjectsController = require("./getProjectsController")
const { checkIsInRole } = require("../../auth/utils")

const router = express.Router()
router.post("/authorize", checkIsInRole(ROLES.Manager), authorizeRoute)

router.get("/", getProjectsController)

router.get("/developers", checkIsInRole(ROLES.Manager), getDevelopersController)

router.post("/", checkIsInRole(ROLES.Manager), createProjectController)

router.delete("/:id", checkIsInRole(ROLES.Manager), deleteProjectsController)

router.put("/:id", checkIsInRole(ROLES.Manager), editProjectsController)
module.exports = router
