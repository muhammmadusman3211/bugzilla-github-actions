const ProjectModel = require("./projectModel")

const getProjectsController = async (req, res, next) => {
  try {
    let projects = await ProjectModel.aggregate([
      {
        $lookup: {
          from: "bugs",
          localField: "bugs",
          foreignField: "_id",
          as: "bugsData",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "developers",
          foreignField: "_id",
          as: "developersData",
        },
      },
    ])
    res.send({
      message: "Successfull",
      projects: projects,
    })
  } catch (error) {
    res.json({
      message: error,
    })
  }
}

module.exports = getProjectsController
