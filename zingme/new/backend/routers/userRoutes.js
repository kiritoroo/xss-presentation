const express       = require('express')
const router        = express.Router()
const { protect }   = require('../middleware/authMiddleware')

const {
  userSignup,
  userLogin,
  userLogout,
  getUser
} = require('../controllers/userController')

router.post('/signup', userSignup)
router.post('/login', userLogin)
router.post('/logout', userLogout)
router.get('/me', protect, getUser)

module.exports = router