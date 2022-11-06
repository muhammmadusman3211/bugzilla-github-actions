const UserModel = require("../model/userModel")

const getDevelopersController = async (req, res) => {
  try {
    const developers = await UserModel.find({ role: "developer" })
    const qa = await UserModel.find({ role: "qa" })
    res.json(
      res.status(200).json({
        status: "ok",
        messages: "Successfully fetched the data",
        data: {
          developers,
          qa,
        },
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

module.exports = getDevelopersController
