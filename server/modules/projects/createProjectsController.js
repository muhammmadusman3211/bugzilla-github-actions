const ProjectModel = require("../projects/projectModel")
const UserModel = require("../auth/userModel")

const createProjectsController = async (req, res, next) => {
  try {
    const project = await ProjectModel.create(
      {
        creator: req.body.creator,
        title: req.body.title,
        developers: req.body.developers,
      },
      function (err, result) {
        if (err)
          res.status(401).json({
            message: err,
          })
      }
    )

    const user = await UserModel.findByIdAndUpdate(req.body.creator, {
      $push: { projects: [project._id] },
      function(err, result) {
        if (err)
          res.json({
            message: err,
          })
      },
    })

    res.send({
      message: "Authorized",
      project: project,
      user: req.user,
    })
  } catch (error) {
    console.log(error)
    res.json({
      message: error,
    })
  }
}

module.exports = createProjectsController
