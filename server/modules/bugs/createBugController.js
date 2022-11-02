const BugModel = require("./bugModel")
const ProjectModel = require("../projects/projectModel")

const createBugController = async (req, res, next) => {
  console.log("rq", req)
  try {
    const bug = await BugModel.create({
      creator: req.body.creator,
      title: req.body.title,
      type: req.body.type,
      status: req.body.status,
      deadline: req.body.deadline,
      image: req.file,
      developers: req.body.developers,
    })

    const project = await ProjectModel.findByIdAndUpdate(req.body.projectId, {
      $push: { bugs: [bug._id] },
      function(err, result) {
        if (err)
          res.json({
            message: err,
          })
      },
    })
    res.json({
      message: "Successfull",
      bug: bug,
    })
  } catch (error) {
    console.log(error)
    res.json({
      message: error,
    })
  }
}

module.exports = createBugController
