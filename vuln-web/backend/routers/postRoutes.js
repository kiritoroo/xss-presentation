const express       = require('express')
const router        = express.Router()
const { protect }   = require('../middleware/authMiddleware')

const {
  postGetAll,
  postAdd,
  postToggleLike,
  postComment
} = require('../controllers/postController')

router.get('/getNewFeeds', protect, postGetAll)
router.post('/postAdd', protect, postAdd)
router.post('/postToggleLike', protect, postToggleLike)
router.post('/postComment', protect, postComment)

module.exports = router