const express       = require('express')
const router        = express.Router()
const { protect }   = require('../middleware/authMiddleware')

const {
  singupUser,
  loginUser,
  getUser
} = require('../controllers/userController')

router.post('/signup', singupUser)
router.post('/login', loginUser)
router.post('/logime', getUser)

module.exports = router