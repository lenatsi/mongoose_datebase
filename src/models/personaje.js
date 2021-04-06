const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PersonajeSchema = new Schema({
  name: String,
  surname: String,
  birthDate: Date,
  profession: String,
  bio: String,
  photo: String,
  savedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const PersonajeModel = mongoose.model('personajes', PersonajeSchema)

module.exports = PersonajeModel
