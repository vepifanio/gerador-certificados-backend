const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

router.use((_req, res, next) => {
  res.header(
    'Acesss-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  );
  next();
});

router.post('/signin', celebrate({
  [Segments.BODY]: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required()
  })
}), AuthController.signin);

module.exports = router;