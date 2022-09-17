const asyncHandler = require('express-async-handler')

const protect = asyncHandler(async (req, res, next) => {
  if (req.session.isAuth) {
    next()
  } else {
    rs
      .status(401)
      .json({
        status: "error",
        message: "Tài khoản đã đăng xuất!"
      })
  }
})

module.exports = { protect }