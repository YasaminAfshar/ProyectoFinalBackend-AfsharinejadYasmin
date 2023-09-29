
import Joi from "joi";

const registerSchema = Joi.object({
    firstName: Joi.string()
        .min(3)
        .max(15)
        .required(),
    lastName: Joi.string()
        .min(3)
        .max(15)
        .required(),
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net", "es", "ar"] },
        })
        .required(),
    age: Joi.number(),
    password: Joi.string()
        .alphanum()
        .min(6)
        .max(15)
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

export const validateRegister = (req, res, next) => {
  const { error } = registerSchema.validate(req.body, { abortEarly: false });
  error ? res.status(400).send(error) : next();
};
