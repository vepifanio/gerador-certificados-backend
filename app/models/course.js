const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      Course.belongsToMany(models.Student, { foreignKey: 'course_id', through: 'CoursesStudents' });
    }
  };

  Course.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    teacher: DataTypes.STRING,
    category: {
      allowNull: false,
      type: DataTypes.STRING
    },
    hours: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    start_date: {
      allowNull: false,
      type: DataTypes.DATEONLY
    },
    final_date: {
      type: DataTypes.DATEONLY
    },
  }, {
    sequelize,
    modelName: 'Course',
  });

  return Course;
}