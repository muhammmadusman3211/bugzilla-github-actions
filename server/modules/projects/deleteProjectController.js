const ProjectModel = require("./projectModel")
const UserModel = require("../auth/userModel")
const BugModel = require("../bugs/bugModel")
const deleteProjectsController = async (req, res, next) => {
  try {
    const user = await UserModel.findByIdAndUpdate(
      { _id: req.user._id },
      {
        $pull: { projects: req.params.id },
        function(err, result) {
          if (err)
            res.json({
              message: err,
            })
        },
      }
    )
    const bug = await ProjectModel.findById(
      { _id: req.params.id },
      function (err, project) {}
    )
    await ProjectModel.findByIdAndDelete({ _id: req.params.id })
    res.send({
      message: "Authorized and Deleted Record",
    })
  } catch (error) {
    console.log(error)
    res.json({
      message: error,
    })
  }
}

module.exports = deleteProjectsController
