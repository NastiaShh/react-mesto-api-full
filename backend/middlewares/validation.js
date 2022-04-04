const { celebrate, Joi } = require('celebrate');
const { isURL } = require('validator');
const ValidationError = require('../errors/ValidationError');

const validateRegister = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom((url) => {
      if (!isURL(url, { protocols: ['http', 'https'], require_protocol: true })) {
        throw new ValidationError('Некорректная ссылка');
      }
      return url;
    }),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateProfileInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const validateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom((url) => {
      if (!isURL(url, { protocols: ['http', 'https'], require_protocol: true })) {
        throw new ValidationError('Некорректная ссылка');
      }
      return url;
    }),
  }),
});

const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().required().length(24),
  }),
});

const validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom((url) => {
      if (!isURL(url, { protocols: ['http', 'https'], require_protocol: true })) {
        throw new ValidationError('Некорректная ссылка');
      }
      return url;
    }),
  }),
});

const validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().required().length(24),
  }),
});

module.exports = {
  validateRegister,
  validateLogin,
  validateProfileInfo,
  validateAvatar,
  validateUserId,
  validateCard,
  validateCardId,
};
