const BugModel = require("../model/bugModel")

const getBugsController = async (req, res, next) => {
  try {
    const bug = await BugModel.find()
    res.json(
      res.status(200).json({
        status: "ok",
        messages: "Succesfully fetched the Bugs",
        data: bug,
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

module.exports = getBugsController
