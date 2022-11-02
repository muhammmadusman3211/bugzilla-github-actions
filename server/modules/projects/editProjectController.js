const ProjectModel = require("./projectModel")

const editProjectsController = async (req, res, next) => {
  console.log(req.body)
  try {
    const project = await ProjectModel.findByIdAndUpdate(
      { _id: req.body.id },
      {
        title: req.body.title,
        developers: req.body.developers,
      }
    )

    res.send({
      message: "Authorized and Updated Record",
      project: project,
    })
  } catch (error) {
    console.log(error)
    res.json({
      message: error,
    })
  }
}

module.exports = editProjectsController
