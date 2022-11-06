const BugModel = require("../model/bugModel")

const assignBugController = async (req, res) => {
  try {
    const bug = await BugModel.findByIdAndUpdate(
      { _id: req.body.id },
      {
        $push: { developers: req.body.user_id },
      },
      function (err, result) {
        if (err)
          res.json(
            res.status(200).json({
              status: "error",
              error: `Error in saving this record to Database: ${err}`,
            })
          )
      }
    )

    res.json(
      res.status(200).json({
        status: "ok",
        data: bug,
        messages: "Bug has been assigned to you",
      })
    )
  } catch (error) {
    res.json(
      res.status(500).json({
        status: "error",
        error: `Error in saving this record to Database: ${error}`,
      })
    )
  }
}

module.exports = assignBugController
