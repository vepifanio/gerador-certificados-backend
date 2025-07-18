const { Op } = require("sequelize");
const { Course, Student } = require('../../models');

const LIMIT = 10;

const listCourses = async ({ page, name }) => {
  const where = {}

  if (name) {
    where.name = {
      [Op.like]: `%${name}%`
    }
  }

  const { count, rows } = await Course.findAndCountAll({
    include: {
      model: Student
    },
    where,
    limit: LIMIT,
    offset: LIMIT * (page - 1),
    order: [
      ['createdAt', 'DESC'],
    ]
  });

  const totalPages = Math.ceil(count / LIMIT);

  return {
    data: rows,
    page,
    limit: LIMIT,
    totalPages,
    totalItems: count
  }
}

module.exports = {
  listCourses
}