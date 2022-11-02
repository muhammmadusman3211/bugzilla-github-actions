const UserModel = require("../modules/auth/userModel")

const getDevelopersController = async (req, res, next) => {
  try {
    const developers = await UserModel.find({ role: "developer" })

    res.send({
      message: "Successfull",
      developers: developers,
    })
  } catch (error) {
    res.json({
      message: error,
    })
  }
}

module.exports = getDevelopersController
