const ProjectModel = require("../model/projectModel")

const getProjectsController = async (req, res) => {
  try {
    let developersId = await ProjectModel.find({})
    let projects = await ProjectModel.find({})
      .lean()
      .populate("bugs")
      .populate("developers")
      .populate("qa")

    res.json(
      res.status(200).json({
        status: "ok",
        messages: "Succesfully fetched projects",
        data: { projects: projects },
      })
    )
  } catch (error) {
    res.json(
      res.status(500).json({
        status: "error",
        errors: `Server Error: ${error}`,
      })
    )
  }
}

module.exports = getProjectsController
