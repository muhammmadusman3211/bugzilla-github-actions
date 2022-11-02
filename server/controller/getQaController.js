const UserModel = require("../modules/auth/userModel")

const getQaController = async (req, res, next) => {
  try {
    const qa = await UserModel.find({ role: "qa" })

    res.send({
      message: "Successfull",
      qa: qa,
    })
  } catch (error) {
    res.json({
      message: error,
    })
  }
}

module.exports = getQaController
