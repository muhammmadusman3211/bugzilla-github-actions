const express = require('express')
const ROLES = require('../utils/roles')

const { authorizeRoute } = require('../controller/authorizeRoute')
const createProjectController = require('../controller/createProjectsController')
const getDevelopersController = require('../controller/getDevelopersController')
const editProjectsController = require('../controller/editProjectController')
const deleteProjectsController = require('../controller/deleteProjectController')
const getProjectsController = require('../controller/getProjectsController')
const { checkIsInRole } = require('../auth/utils')
const {
  createProjectSchema,
  validateSchemas,
} = require('../validations/schema')

const router = express.Router()
router.post('/authorize', checkIsInRole(ROLES.Manager), authorizeRoute)

router.get('/', getProjectsController)

router.get('/developers', checkIsInRole(ROLES.Manager), getDevelopersController)

router.get('/qa', checkIsInRole(ROLES.Manager), getDevelopersController)

router.post(
  '/',
  createProjectSchema,
  validateSchemas,
  checkIsInRole(ROLES.Manager),
  createProjectController
)

router.delete('/:id', checkIsInRole(ROLES.Manager), deleteProjectsController)

router.patch(
  '/:id',
  createProjectSchema,
  validateSchemas,
  checkIsInRole(ROLES.Manager),
  editProjectsController
)
module.exports = router
