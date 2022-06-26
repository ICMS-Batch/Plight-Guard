import Joi from "@hapi/joi";

const loginCredentials = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const registerCredentials = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
  full_name: Joi.string().required(),
  municipalityId: Joi.number().required(),
});

export default {
  loginCredentials,
  registerCredentials,
};
