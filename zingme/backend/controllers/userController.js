const bcrypt          = require('bcryptjs')
const asyncHandler    = require('express-async-handler')
const User            = require('../models/userModel')

// @route   POST /api/singup
const singupUser = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body

  if (!fullname || !email || !password) {
    res.status(400)
    throw new Error('Vui lòng điền đầy đủ thông tin!')
  }

  let user = await User.findOne({ email })

  if (user) {
    res.status(400)
    throw new Error('Người dùng đã tồn tại!')
  }

  const hashedPsw = await bcrypt.hash(password, 10);

  user = new User({
    fullname,
    email,
    password: hashedPsw
  })

  await user.save()

  res.status(201).json({
    status: "success",
    message: "Đăng ký tài khoản thành công!"
  })
})

// @route   POST /api/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    res.status(400)
    throw new Error('Tài khoản không tồn tại!')
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    req.session.isAuth = true
    req.session.cookie.httpOnly = false

    res.status(201).json({
      status: "success",
      message: "Đăng nhập thành công"
    })
  } else {
    res.status(400)
    throw new Error('Thông tin không hợp lệ!')
  }
})

const getUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

module.exports = {
  singupUser,
  loginUser,
  getUser
}