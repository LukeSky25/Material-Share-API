import { Sequelize, Model } from "sequelize";

export default class Categoria extends Model {
  static init(sequelize) {
    super.init({
      categoria: Sequelize.STRING(40),
      tipo: Sequelize.STRING(30),
      descricao: Sequelize.STRING(100)
    }, {
      sequelize
    });
    return this;
  }
}
