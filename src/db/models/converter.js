'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Converter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Origin }) {
      this.belongsTo(Origin, { foreignKey: 'originId' });
      // define association here
    }
  };
  Converter.init({
    path: DataTypes.STRING,
    originId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Converter',
  });
  return Converter;
};
