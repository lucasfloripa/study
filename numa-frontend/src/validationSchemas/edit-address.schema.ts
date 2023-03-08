import Joi from 'joi';

export const schema = Joi.object({
  addressLine1: Joi.string()
    .messages({
      'string.base': "'addressLine1' should be a string",
    })
    .allow(null, ''),
  addressLine2: Joi.string()
    .messages({
      'string.base': "'addressLine2' should be a string",
    })
    .allow(null, ''),
  postalCode: Joi.string()
    .messages({
      'string.base': "'addressLine2' should be a string",
    })
    .allow(null, ''),
  city: Joi.string()
    .messages({
      'string.base': "'city' should be a string",
    })
    .allow(null, ''),
  companyName: Joi.string()
    .messages({
      'string.base': "'companyName' should be a string",
    })
    .allow(null, ''),
  countryCode: Joi.string()
    .max(2)
    .uppercase()
    .messages({
      'string.base': "'countryCode' should be a string",
      'string.max': "'countryCode' must be a maximum of 2 characters",
      'string.uppercase': "'countryCode' must be a uppercase",
    })
    .allow(null, ''),
  regionCode: Joi.string()
    .max(2)
    .uppercase()
    .messages({
      'string.base': "'regionCode' should be a string",
      'string.max': "'regionCode' must be a maximum of 2 characters",
      'string.uppercase': "'regionCode' must be a uppercase",
    })
    .allow(null, ''),
  email: Joi.string()
    .email({
      tlds: { allow: false },
    })
    .messages({
      'string.base': "'email' should be a string",
      'string.email': "'email' must be a email",
    })
    .allow(null, ''),
  taxId: Joi.string()
    .messages({
      'string.base': "'addressLine1' should be a string",
    })
    .allow(null, ''),
  firstName: Joi.string()
    .messages({
      'string.base': "'addressLine1' should be a string",
    })
    .allow(null, ''),
  lastName: Joi.string()
    .messages({
      'string.base': "'addressLine1' should be a string",
    })
    .allow(null, ''),
});
