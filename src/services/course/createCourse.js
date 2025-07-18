const { Course } = require('../../models')

const createCourse = async ({ name, teacher, category, hours, start_date, final_date = null }) => {

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
    throw new Error("Course already exists")
  }

  return course;
}

module.exports = {
  createCourse
}