const { Student, Course } = require('../models');

module.exports = {
  async index(req, res) {
    const students = await Student.findAll({
      include: {
        model: Course,
      },
    });

    res.json(students);
  },

  async create(req, res) {
    const { cpf } = req.body;

    const [student, created] = await Student.findOrCreate({
      where: { cpf }
    });

    return res.json(student);
  },

  async show(req, res) {
    const { id } = req.params;

    const student = await Student.findOne({
      where: { id: id },
      attributes: ['id', 'cpf', 'createdAt'],
      include: { 
        model: Course,
        attributes: ['id', 'name'],
        through: {
          attributes: []
        }
      }
    });

    if (student == null) {
      return res.status(404).json({ message: 'Student not found' });
    }

    return res.json(student);
  },

  async findByCpf(req, res) {
    const { cpf, name } = req.body;

    const student = await Student.findOne({
      where: { cpf }
    });


    if (student == null) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const courses = await student.getCourses({
      order: [
        ["start_date", "DESC"]
      ]
    });

    return res.json({ student, courses, name });
  },

  async link(req, res) {
    const { id } = req.params;

    const { course_id } = req.body;

    const student = await Student.findOne({
      where: { id: id }
    });

    const course = await Course.findOne({
      where: { id: course_id }
    });

    const result = student.addCourse(course);

    return res.json(result);
  }
};