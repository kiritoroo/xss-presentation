const asyncHandler    = require('express-async-handler')
const Post            = require('../models/postModel')
const fs              = require('fs')
const base_url          = "http://localhost:5000"

// @route   POST /api/getNewFeeds
const postGetAll = asyncHandler(async (req, res) => {

})

// @route   POST /api/addPost
const postAdd = asyncHandler(async (req, res) => {

})

// @route   POST /api/toggleLike
const postToggleLike = asyncHandler(async (req, res) => {
  
})

// @route   POST /api/postComment
const postComment = asyncHandler(async (req, res) => {

})

module.exports = {
  postGetAll,
  postAdd,
  postToggleLike,
  postComment
}