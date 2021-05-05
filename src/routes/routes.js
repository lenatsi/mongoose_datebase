const express = require('express')
const router = express.Router()
const personajeController = require('../controllers/personajes')
const userController = require("../controllers/user")
const passport = require('../auth/auth')

router.post('/personaje',passport.auth, personajeController.savePersonaje)
router.get('/personajes', personajeController.getPersonajes)
router.get('/personaje/:id', personajeController.getPersonaje)
router.put('/personaje/:id', passport.auth, personajeController.updatePersonaje)
router.delete('/personaje/:id', passport.auth, personajeController.deletePersonaje)

router.post("/signup", userController.signup)
router.post("/login", userController.login)
router.get("/user", passport.auth, userController.userDetail)

module.exports = router