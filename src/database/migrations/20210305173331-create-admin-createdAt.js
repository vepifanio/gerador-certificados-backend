'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Admins', 'createdAt', {
      allowNull: false,
      type: Sequelize.DATE,
    });

    await queryInterface.addColumn('Admins', 'updatedAt', {
      allowNull: false,
      type: Sequelize.DATE,
    });

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Admins', 'createdAt');
    await queryInterface.removeColumn('Admins', 'updatedAt');
  }
};
