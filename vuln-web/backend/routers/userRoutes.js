const express       = require('express')
const router        = express.Router()
const { protect }   = require('../middleware/authMiddleware')

const {
  userSignup,
  userLogin,
  userLogout,
  uploadCover,
  uploadAvatar,
  getUser
} = require('../controllers/userController')

router.post('/signup', userSignup)
router.post('/login', userLogin)
router.post('/logout', userLogout)
router.get('/me', protect, getUser)
router.post('/me/upCover', protect, uploadCover)
router.post('/me/upAvatar', protect, uploadAvatar)

module.exports = router