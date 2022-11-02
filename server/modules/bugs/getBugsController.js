const BugModel = require("../model/bugModel")

const getBugsController = async (req, res, next) => {
  try {
    const bug = await BugModel.find()
    console.log(bug)
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

module.exports = getBugsController
