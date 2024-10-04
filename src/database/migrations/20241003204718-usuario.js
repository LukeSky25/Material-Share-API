/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('usuario', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      nome: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      senha_hash: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      nivel_acesso: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      foto: {
        type: Sequelize.BLOB('long'),
        allowNull: true,
      },
      cpf: {
        type: Sequelize.CHAR(11),
        allowNull: false,
      },
      data_nascimento: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      telefone: {
        type: Sequelize.STRING(14),
        allowNull: false,
      },
      cep: {
        type: Sequelize.CHAR(8),
        allowNull: true,
      },
      complemento: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      numero: {
        type: Sequelize.STRING(4),
        allowNull: true,
      },
      data_cadastro: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      status_cadastro: {
        type: Sequelize.STRING(20),
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

  async down (queryInterface,) {
    await queryInterface.dropTable('usuario');
  }
};
