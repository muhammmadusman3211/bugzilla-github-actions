const BugModel = require("./bugModel")

const assignBugController = async (req, res, next) => {
  try {
    const bug = await BugModel.findByIdAndUpdate(
      { _id: req.body.id },
      {
        $push: { developers: req.body.user_id },
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

module.exports = assignBugController
