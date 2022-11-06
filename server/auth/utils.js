const checkIsInRole =
  (...roles) =>
  (req, res, next) => {
    if (!req.user) {
      return res.send('Please Login to proceed')
    }
    const hasRole = roles.find((role) => req.user.role === role)
    if (!hasRole) {
      return res.send({ message: 'Unauthorized' })
    }

    return next()
  }

module.exports = { checkIsInRole }
