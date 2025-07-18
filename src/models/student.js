const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    static associate(models) {
      Student.belongsToMany(models.Course, { foreignKey: 'student_id', through: 'CoursesStudents' });
    }
  };

  Student.init({
    cpf: {
      type: DataTypes.STRING(11),
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Student',
  });

  return Student;
}