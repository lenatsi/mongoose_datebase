const Joi = require('joi')
const schema = Joi.object({
    name:Joi.string().required(),
    surname:Joi.string().required(),
    birthDate:Joi.date().required(),
    bio:Joi.string().required(),
    photo: Joi.string(),
    profession:Joi.string().required(),

})

function validate(body){
    return schema.validate({
        name:body.name,
        surname:body.surname,
        birthDate:body.birthDate,
        bio:body.bio,
        photo:body.photo,
        profession:body.profession
    },
    {abortEarly:false},)
}

module.exports = {validate}