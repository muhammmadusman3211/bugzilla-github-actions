const ProjectModel = require("../model/projectModel")

const editProjectsController = async (req, res) => {
  console.log(req.params.id)
  try {
    const project = await ProjectModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        title: req.body.title,
        developers: req.body.developers,
        qa: req.body.qa,
      },
      function (err, result) {
        if (err)
          res.json(
            res.status(200).json({
              status: "error",
              errors: `Error in saving this record to Database: ${err}`,
            })
          )
      }
    )

    res.json(
      res.status(200).json({
        status: "ok",
        messages: "You have successfully edited your project",
        projects: project,
      })
    )
  } catch (error) {
    res.json(
      res.status(500).json({
        status: "error",
        errors: `Error in saving this record to Database: ${error}`,
      })
    )
  }
}

module.exports = editProjectsController
