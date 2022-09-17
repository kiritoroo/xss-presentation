const bcrypt          = require('bcryptjs')
const asyncHandler    = require('express-async-handler')
const User            = require('../models/userModel')

// @route   POST /api/singup
const userSignup = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body

  if (!fullname || !email || !password) {
    return res
      .status(400)
      .json({
        status  : "error",
        message : "Vui lòng điền đầy đủ thông tin!"
      })
  }

  let user = await User.findOne({ email })

  if (user) {
    return res
      .status(400)
      .json({
        status  : "error",
        message : "Người dùng đã tồn tại!"
      })
  }

  const hashedPsw = await bcrypt.hash(password, 10);

  user = new User({
    fullname,
    email,
    password: hashedPsw
  })

  await user.save()

  console.log( `Người dùng mới: ${user.email}`)

  return res
    .status(201)
    .json({
      status  : "success",
      message : "Đăng ký tài khoản thành công!"
  })
})

// @route   POST /api/login
const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    return res
      .status(400)
      .json({
        status  : "error",
        message : "Tài khoản không tồn tại!"
      })
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    req.session.isAuth = true
    // req.session.cookie.httpOnly = false

    console.log(`Phiên mới đã được tạo: ${req.session.id}`)

    return res
      .status(201)
      .json({
        status  : "success",
        message : "Đăng nhập thành công"
      })
  } else {
    return res
      .status(400)
      .json({
        status  : "success",
        message : "Tài khoản không hợp lệ!"
      })
  }
})

// @route   POST /api/me
const getUser = asyncHandler(async (req, res) => {

})

module.exports = {
  userSignup,
  userLogin,
  getUser
}