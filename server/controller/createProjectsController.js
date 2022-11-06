const ProjectModel = require("../model/projectModel")

const createProjectsController = async (req, res) => {
  try {
    const project = await ProjectModel.create(
      {
        creator: req.body.creator,
        title: req.body.title,
        developers: req.body.developers,
        qa: req.body.qa,
      },
      function (err) {
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
        messages: "You have a successfully created a Project",
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

module.exports = createProjectsController
