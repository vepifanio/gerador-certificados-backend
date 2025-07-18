const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const StudentController = require('../controllers/StudentController');

const router = express.Router();

router.post('/', celebrate({
  [Segments.BODY]: Joi.object({
    cpf: Joi.string().required().length(11),
    name: Joi.string().required(),
  })
}), StudentController.findByCpf);


module.exports = router;