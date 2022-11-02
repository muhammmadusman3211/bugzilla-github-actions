const BugModel = require("./bugModel")

const updateBugController = async (req, res, next) => {
  try {
    console.log(req.body)
    const bug = await BugModel.findByIdAndUpdate(
      { _id: req.body.id },
      {
        status: req.body.status,
      }
    )

    res.send({
      message: "Authorized and Updated Bug",
      bug: bug,
    })
  } catch (error) {
    console.log(error)
    res.json({
      message: error,
    })
  }
}

module.exports = updateBugController
