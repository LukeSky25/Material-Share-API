'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('usuario', 'nivel_acesso', {
      type: Sequelize.STRING(11), // Altera o tipo para STRING com tamanho 11
      allowNull: false // Se a coluna não pode ser nula, mantenha como true
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('sua_tabela', 'nivel_acesso', {
      type: Sequelize.STRING(10), // Volta para STRING com tamanho 10
      allowNull: false // Ajuste conforme necessário
    });
  }
};
