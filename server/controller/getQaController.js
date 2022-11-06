const UserModel = require("../modules/auth/userModel")

const getQaController = async (req, res) => {
  try {
    const qa = await UserModel.find({ role: "qa" })

    res.json(
      res.status(200).json({
        status: "ok",
        messages: "Successfully fetched qa",
        data: qa,
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

module.exports = getQaController
