const bcrypt          = require('bcryptjs')
const asyncHandler    = require('express-async-handler')
const User            = require('../models/userModel')
const fs              = require('fs')
const base_url          = "http://localhost:5000"

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

  // console.log(req.sessionID)
  
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
    req.session.cookie.httpOnly = false

    const sessionUser = {
      id: user._id,
      email: user.email
    }

    req.session.user = sessionUser


    console.log(`Phiên mới đã được tạo: ${req.session.id}`)
    // console.log(req.session);

    return res
      .status(200)
      // .cookie('sid', req.sessionID)
      .json({
        status  : "success",
        message : "Đăng nhập thành công"
      })
  } else {
    return res
      .status(400)
      .json({
        status  : "error",
        message : "Tài khoản không hợp lệ!"
      })
  }
})

// @route   POST /api/logout
const userLogout = asyncHandler(async (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res
        .status(400)
        .json({
          status  : "error",
          message : "Không thể đăng xuất"
        })
    } else {
      return res
        .status(200)
        .json({
          status  : "success",
          message : "Đăng xuất thành công"
        })
    }
  })
})

// @route   GET /api/me
const getUser = asyncHandler(async (req, res) => {
  const { user: uss } = req.session

  const user = await User.findOne({"_id": uss.id})

  const data = {
    fullname      : user.fullname,
    email         : user.email,
    city          : user.city,
    aboutMe       : user.aboutMe,
    profileImage  : user.profileImage!="" ? base_url + "/" + user.profileImage : "",
    coverPhoto    : user.coverPhoto!="" ? base_url + "/" + user.coverPhoto : ""
  }

  return res
    .status(200)
    .json({
      status    : "success",
      message   : "Đã xác thực!",
      data      : data 
    })
})

// @route   POST /api/me/upCover
const uploadCover = asyncHandler(async (req, res) => {
  const { user: uss } = req.session

  const user = await User.findOne({ "_id": uss.id })

  const { imgData, imgName } = req.body


  const img_url = 'public/images/' + user.email + "_imngCover_" + imgName
  const base64Image = imgData.split(';base64,').pop()

  const old_path = user.coverPhoto

  if (old_path != "") {
    fs.unlink(old_path, (err) => {
      if (err) throw err
    })
  }


  fs.writeFile(img_url, base64Image, {encoding: 'base64'}, (err) => {
    user.updateOne({
      $set: {
        coverPhoto: img_url
      },
    }, (error, data) => {
      return res
        .status(201)
        .json({
          status  : "success",
          message : "Cập nhật ảnh bìa thành công",
          data    : base_url + "/" + img_url
        })
    })
  })
})

// @route   POST /api/me/upAvatar
const uploadAvatar = asyncHandler(async (req, res) => {
  const { user: uss } = req.session

  const user = await User.findOne({ "_id": uss.id })

  const { imgData, imgName } = req.body


  const img_url = 'public/images/' + user.email + "_profileImage_" + imgName
  const base64Image = imgData.split(';base64,').pop()

  const old_path = user.profileImage

  if (old_path != "") {
    fs.unlink(old_path, (err) => {
      if (err) throw err
    })
  }


  fs.writeFile(img_url, base64Image, {encoding: 'base64'}, (err) => {
    user.updateOne({
      $set: {
        profileImage: img_url
      },
    }, (error, data) => {
      return res
        .status(201)
        .json({
          status  : "success",
          message : "Cập nhật ảnh đại diện thành công",
          data    : base_url + "/" + img_url
        })
    })
  })
})

module.exports = {
  userSignup,
  userLogin,
  userLogout,
  uploadCover,
  uploadAvatar,
  getUser
}