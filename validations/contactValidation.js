const Joi = require("joi");

const contactValidationSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().min(10).max(15).required(),
  address: Joi.string().optional(),
});

module.exports = contactValidationSchema;