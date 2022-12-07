import * as Joi from "joi";

export const createUserValidator = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  });