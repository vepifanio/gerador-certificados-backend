const { Op, where } = require('sequelize');
const { Course, Student } = require('../app/models');

const LIMIT = 10;

module.exports = {
  async index(req, res) {
    const { page, name } = req.query;

    const whereCondition = {};

    if (name) {
      whereCondition.name = {
        [Op.like]: `%${name}%`
      }
    }

    const { count, rows } = await Course.findAndCountAll({
      include: {
        model: Student
      },
      where: whereCondition,
      limit: LIMIT,
      offset: LIMIT * (page - 1),
      order: [
        ['createdAt', 'DESC'],
      ]
    });

    const totalPages = Math.ceil(count / LIMIT)

    res.json({
      data: rows,
      page,
      limit: LIMIT,
      totalPages,
      totalItems: count
    });
  },

  async create(req, res) {

    const {
      name,
      teacher,
      category,
      hours,
      start_date,
      final_date = null
    } = req.body;

    const [course, created] = await Course.findOrCreate({
      where: {
        name,
        teacher: teacher === '' ? null : teacher,
        category,
        hours,
        start_date,
        final_date: final_date === '' ? null : final_date
      }
    });

    if (!created) {
      return res.status(409).json({ message: 'Course already exists' });
    }

    return res.json(course);

  },

  async show(req, res) {
    const { id } = req.params;

    const course = await Course.findOne({
      where: { id: id },
      include: { model: Student }
    });

    if (course == null) {
      return res.status(404).json({ message: 'Course not found' });
    }

    return res.json(course);
  },

  async link(req, res) {
    const { id } = req.params;

    const { student_id } = req.body;

    const course = await Course.findOne({
      where: { id: id }
    });

    const student = await Student.findOne({
      where: { id: student_id }
    });

    const result = course.addStudent(student);

    return res.json(result);

  },

  async unlink(req, res) {
    const { id, student_id } = req.params;

    const course = await Course.findOne({
      where: { id }
    });

    const student = await Student.findOne({
      where: { id: student_id }
    });

    const result = course.removeStudent(student);

    return res.json(result);
  },

  async delete(req, res) {
    const { id } = req.params;

    try {
      const result = await Course.destroy({
        where: {
          id
        }
      });

      return res.json(result);
    } catch (err) {
      return res.status(400).json(err);
    }
  },

  async update(req, res) {
    const { id } = req.params;

    const {
      name,
      teacher,
      category,
      hours,
      start_date,
      final_date
    } = req.body;

    const course = await Course.findOne({
      where: { id: id },
      include: { model: Student }
    });

    if (course == null) {
      return res.status(404).json({ message: 'Course not found' });
    }

    try {
      Object.assign(course, {
        name,
        teacher,
        category,
        hours,
        start_date,
        final_date
      });

      await course.save();
      return res.json(course);

    } catch (err) {
      return res.status(400).json(err);
    }
  }
};