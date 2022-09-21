const asyncHandler    = require('express-async-handler')
const Post            = require('../models/postModel')
const User            = require('../models/userModel')
const fs              = require('fs')
const base_url        = "http://localhost:5000"
const mongoose        = require('mongoose')
const ObjectId        = mongoose.Types.ObjectId

// @route   GET /api/getNewFeeds
const postGetAll = asyncHandler(async (req, res) => {
  const { user: uss } = req.session

  const user = await User.findOne({"_id": uss.id})

  const data = await Post
    .find()
    .limit(10)
    .sort({
      "createdAt": -1
    })

  return res
    .status(200)
    .json({
      status    : "success",
      message   : "Đã xác thực!",
      data      : data
    })
})

// @route   POST /api/postAdd
const postAdd = asyncHandler(async (req, res) => {
  const { user: uss } = req.session

  const user = await User.findOne({"_id": uss.id})

  const { caption } = req.body

  let imageData = ""
  let imagePath = ""

  if (req.body.imageData) {
    imageData = req.body.imageData

    const nowTime = new Date().getTime()
    imagePath = 'public/images/' + 'post_' + user.email + "_" + nowTime.toString() + '.jpg'
    const base64Image = imageData.split(';base64,').pop()

    fs.writeFile(imagePath, base64Image, {encoding: 'base64'}, (err) => {
      console.log('Một bài viết mới được thêm');
    })
  }

  const post = new Post({
    caption: caption,
    image: imagePath,
    type: 'post',
    createdAt: new Date().getTime(),
    likers: [],
    comments: [],
    user: {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      profileImage: user.profileImage
    }
  })

  await post.save()

  return res
    .status(201)
    .json({
      status  : "success",
      message : "Đăng bài viết thành công!"
    })
})

// @route   POST /api/postToggleLike
const postToggleLike = asyncHandler(async (req, res) => {
  
})

// @route   POST /api/postComment
const postComment = asyncHandler(async (req, res) => {
  const { user: uss } = req.session

  const user = await User.findOne({"_id": uss.id})

  const { _id, comment } = req.body

  const createAt = new Date().getTime()

  Post.findOne({
    "_id": _id
  }, (error, post) => {
    if (post == null) {
      res
        .status(400)
        .json({
          "status": "error",
          "message": "Bài viết không tồn tại"
        })
    } else {
      const commentId = ObjectId()

      Post.updateOne({
        "_id": _id
      }, {
        $push: {
          comments: {
            _id: commentId,
            comment: comment,
            createAt: createAt,
            user: {
              _id: user._id,
              name: user.fullname,
              profileImage: user.profileImage
            },
            replies: []
          }
        }
      }, (error, data) => {
        
      })

      console.log("Bình luận mới đã được thêm")

      res
        .status(201)
        .json({
          "status": "success",
          "message": "Đã thêm mới bình luận"
        })
    }
  })
})

module.exports = {
  postGetAll,
  postAdd,
  postToggleLike,
  postComment
}