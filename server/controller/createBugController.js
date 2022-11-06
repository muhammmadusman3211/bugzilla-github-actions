const BugModel = require("../model/bugModel")
const ProjectModel = require("../model/projectModel")

const createBugController = async (req, res) => {
  console.log("rq", req)
  try {
    const bug = await BugModel.create({
      creator: req.body.creator,
      title: req.body.title,
      type: req.body.type,
      status: req.body.status,
      deadline: req.body.deadline,
      image: req.file,
    })
    await ProjectModel.findByIdAndUpdate(req.body.projectId, {
      $push: { bugs: [bug._id] },
      function(err) {
        if (err)
          res.json(
            res.status(200).json({
              status: "error",
              errors: `Error in saving this record to Database: ${err}`,
            })
          )
      },
    })

    res.json(
      res.status(200).json({
        status: "ok",
        messages: "You have suceessfully created a Bug",
        bug: bug,
      })
    )
  } catch (error) {
    res.json(
      res.status(200).json({
        status: "error",
        errors: `Error in saving this record to Database: ${error}`,
      })
    )
  }
}

module.exports = createBugController
