const ProjectModel = require("../model/projectModel")
const UserModel = require("../model/userModel")
const deleteProjectsController = async (req, res) => {
  try {
    await UserModel.findByIdAndUpdate(
      { _id: req.user._id },
      {
        $pull: { projects: req.params.id },
        function(err) {
          if (err)
            res.json(
              res.status(200).json({
                status: "error",
                errors: `Error in saving this record to Database: ${err}`,
              })
            )
        },
      }
    )
    await ProjectModel.findById({ _id: req.params.id })
    await ProjectModel.findByIdAndDelete(
      { _id: req.params.id },
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
        messages: "You have successfully deleted a record",
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

module.exports = deleteProjectsController
