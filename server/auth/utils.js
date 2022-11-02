const checkIsInRole =
  (...roles) =>
  (req, res, next) => {
    if (!req.user) {
      return res.send("Please Login to proceed")
    }
    console.log(roles.find((role) => req.user.role === role))
    const hasRole = roles.find((role) => req.user.role === role)
    if (!hasRole) {
      return res.send({ message: "Unauthorized" })
    }

    return next()
  }

const getRedirectUrl = (role) => {
  switch (role) {
    case ROLES.Admin:
      return "/admin-dashboard"
    case ROLES.Customer:
      return "/customer-dashboard"
    default:
      return "/"
  }
}
module.exports = { checkIsInRole, getRedirectUrl }
