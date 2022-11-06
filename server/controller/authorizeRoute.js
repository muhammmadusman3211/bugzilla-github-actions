const authorizeRoute = (req, res, next) => {
  res.json({
    message: "Authorized",
    user: req.user,
    token: req.query.secret_token,
  })
}

module.exports = {
  authorizeRoute,
}
