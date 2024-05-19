const express = require('express');
const router = express.Router()
const cors = require('cors')
const { registerUser, loginUser, getProfile, logoutUser, createCharacter, getClasses, getRaces, getCharactersByUser, getBackgrounds } = require('../controllers/authController')

//middleware
router.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173'
  })
)

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', getProfile)
router.post('/logout', logoutUser)
router.post('/create', createCharacter)
router.get('/classes', getClasses)
router.get('/races', getRaces)
router.get('/characters', getCharactersByUser)
router.get('/backgrounds', getBackgrounds)


module.exports = router