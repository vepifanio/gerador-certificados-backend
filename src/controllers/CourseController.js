const { Course, Student } = require('../models');
const { createCourse } = require('../services/course/createCourse');
const { listCourses } = require('../services/course/listCourses');

module.exports = {
  async index(req, res) {
    const result = await listCourses(req.query);
    return res.json(result);
  },

  async create(req, res) {
    try {
      const result = await createCourse(req.body);
      return res.json(result);
    } catch (error) {
      if (error.message === "Course already exists") {
        return res.status(409).json({ message: error.message });
      }

      return res.status(500).json({ message: error.message });
    }
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