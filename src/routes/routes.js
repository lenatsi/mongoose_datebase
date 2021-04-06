const express = require('express')
const router = express.Router()
const personajeController = require('../controllers/personajes')

router.post('/personaje', personajeController.savePersonaje)
router.get('/personajes', personajeController.getPersonajes)
router.get('/personaje/:id', personajeController.getPersonaje)
router.put('/personaje/:id', personajeController.updatePersonaje)
router.delete('/personaje/:id', personajeController.deletePersonaje)

module.exports = router