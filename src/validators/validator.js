const Joi = require('joi')
const schema = Joi.object({
    name:Joi.string().pattern(new RegExp('^[a-zA-Z]{1,}$')).required(),
    surname:Joi.string().pattern(new RegExp('^[a-zA-Z]{1,}$')).required(),
    birthDate:Joi.date().required(),
    bio:Joi.string().required(),
    photo: Joi.string().pattern(new RegExp('^((ht|f)tp(s?))\://([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(/\S*)?$')),
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