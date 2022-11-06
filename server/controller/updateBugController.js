const BugModel = require("../model/bugModel")

const updateBugController = async (req, res) => {
  try {
    console.log(req.body)
    const bug = await BugModel.findByIdAndUpdate(
      { _id: req.body.id },
      {
        status: req.body.status,
      },
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
        messages: "Updated Bug Succesfully",
        data: bug,
      })
    )
  } catch (error) {
    res.json(
      res.status(500).json({
        status: "error",
        messages: `Server Error: ${error}`,
      })
    )
  }
}

module.exports = updateBugController
