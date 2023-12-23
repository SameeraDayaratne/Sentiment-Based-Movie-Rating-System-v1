import Joi from '@hapi/joi'

const authSchemaSignIn = Joi.object({
    firstName: Joi.string().required(),
    lastName : Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required()
});

const authSchemaLogIn = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required()
});

export {
    authSchemaSignIn,
    authSchemaLogIn
}