const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const { authJwt } = require('../middlewares');
const StudentController = require('../controllers/StudentController');
const CourseController = require('../controllers/CourseController');

const router = express.Router();

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-acess-token, Origin, Content-Type, Accept"
  );

  next();
});

router.get('/students', [authJwt.verifyToken], StudentController.index);
router.post('/students', celebrate({
  [Segments.BODY]: Joi.object({
    cpf: Joi.string().required().length(11),
  })
}), [authJwt.verifyToken], StudentController.create);

router.get('/students/:id', [authJwt.verifyToken], StudentController.show);

router.post('/students/:id', celebrate({
  [Segments.BODY]: Joi.object({
    course_id: Joi.number().integer().required()
  })
}), [authJwt.verifyToken], StudentController.link);

router.get('/courses', celebrate({
  [Segments.QUERY]: Joi.object({
    page: Joi.number().optional().default(1).min(1),
    name: Joi.string().optional().min(3)
  })
}), [authJwt.verifyToken], CourseController.index);

router.post('/courses', celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().required(),
    teacher: Joi.string().allow(''),
    category: Joi.string().required(),
    hours: Joi.number().integer().required(),
    start_date: Joi.date().required(),
    final_date: Joi.date().allow(''),
  })
}), [authJwt.verifyToken], CourseController.create);

router.get('/courses/:id', [authJwt.verifyToken], CourseController.show);

router.post('/courses/:id', celebrate({
  [Segments.BODY]: Joi.object({
    student_id: Joi.number().integer().required(),
  })
}), [authJwt.verifyToken], CourseController.link);

router.put('/courses/:id', celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().required(),
    teacher: Joi.string().allow(''),
    category: Joi.string().required(),
    hours: Joi.number().integer().required(),
    start_date: Joi.date().required(),
    final_date: Joi.date().allow(''),
  })
}), [authJwt.verifyToken], CourseController.update)

router.delete('/courses/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  })
}), [authJwt.verifyToken], CourseController.delete);

router.delete('/courses/:id/:student_id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
    student_id: Joi.number().required(),
  })
}), [authJwt.verifyToken], CourseController.unlink)

module.exports = router;