import Joi from "@hapi/joi";

const createReport = Joi.object().keys({
  lat: Joi.number().required(),
  long: Joi.number().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  categoryId: Joi.number().required(),
  address: Joi.string().required(),
  incidentId: Joi.number().required(),
  userId: Joi.number().required(),
});

export default {
  createReport,
};
