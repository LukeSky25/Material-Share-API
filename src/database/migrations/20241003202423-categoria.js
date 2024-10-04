/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('categoria', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      categoria: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      tipo: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      descricao: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

  },

  async down (queryInterface) {
    await queryInterface.dropTable('categoria');
  }
};
