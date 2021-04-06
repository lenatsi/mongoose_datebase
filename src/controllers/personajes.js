const controller = {}
const Personaje = require('../models/personaje')
const validator = require('../validators/validator')

controller.savePersonaje = async (req, res) => {
  let name = req.body.name
  let surname = req.body.surname
  let birthDate = req.body.birthDate
  let bio = req.body.bio
  let profession = req.body.profession
  let photo = req.body.photo

  const validation = validator.validate(req.body)

  if (validation.error) {
    const error = validation.error.details[0].message
    console.log(error)
    res.status(400).send(error)
    return
  }else{
    if (name && surname && birthDate && bio && profession && photo) {
      try {
        const personaje = new Personaje({
          name: name,
          surname: surname,
          birthDate: birthDate,
          bio: bio,
          profession: profession,
          photo: photo,
        })
        await personaje.save()
        res.status(204).send()
      } catch (err) {
        res.status(500).send(err)
      }
    } else {
      res.status(400).send()
    }
  }
  
}
controller.getPersonaje = async (req, res) => {
  const id = req.params.id
  if (id) {
    try {
      const personajes = await Personaje.findById(id)
      res.json(personajes)
    } catch (err) {
      res.status(500).send(err)
    }
  } else {
    res.status(400).send()
  }
}
controller.getPersonajes = async (req, res) => {
  const filter = req.query.search
  const startDate = req.query.startDate
  const endDate = req.query.endDate
  const query = {
    $or: [
      {
        name: new RegExp(filter, 'i'),
      },
      {
        surname: new RegExp(filter, 'i'),
      },
      {
        birthDate: {
          $gte: startDate,
          $lte: endDate,
        },
      },
    ],
  }
  try {
    const personajes = await Personaje.find(query)
    res.send(personajes)
  } catch (err) {
    res.status(500).send(err)
  }
  /*let query ={}
  
  if (filter || (startDate && endDate)) {
    query.$or =[]
  }
  
  if (filter) {
    query.$or.push({ surname: new RegExp(filter, 'i') })
  }
  
  if (startDate && endDate) {
    query.$or.push({
      birthDate:{
        $gte: startDate,
          $lte: endDate,
      }
    })
  }
  
  try {
    const personaje = await Personaje.find(query)
    res.send(personaje)
  }catch (error){
    console.log(error)
    res.status(500).send('Error al enviar datos')
  }*/
}
controller.updatePersonaje = async (req, res) => {
  const name = req.body.name
  const surname = req.body.surname
  const birthDate = req.body.birthDate
  const bio = req.body.bio
  const profession = req.body.profession
  const photo = req.body.photo
  const personajeId = req.params.id

  const validation = validator.validate(req.body)

  if(validation.error) {
    const error = validation.error.details[0].message
    console.log(error)
    res.status(400).send(error)
    return
  }else{
    if (personajeId) {
      try {
        await Personaje.findByIdAndUpdate( personajeId,{
          name: name,
          surname: surname,
          birthDate: birthDate,
          bio: bio,
          profession: profession,
          photo: photo,
          updatedAt: Date.now(),
        })
        res.status(204).send()
      } catch (err) {
        res.status(500).send(err)
      }
    } else {
      res.status(400).send()
    }
  }
  
}
controller.deletePersonaje = async (req, res) => {
  const id = req.params.id
  if (id) {
    try {
      await Personaje.findByIdAndDelete(id)
      res.status(204).send()
    } catch (err) {
      res.status(500).send(err)
    }
  } else {
    res.status(400).send()
  }
}

module.exports = controller
