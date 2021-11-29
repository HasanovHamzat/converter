'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Origin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Converter, User }) {
      this.belongsTo(User, { foreignKey: 'userId' });
      this.hasOne(Converter, { foreignKey: 'originId' });
      // define association here
    }
  };
  Origin.init({
    path: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Origin',
  });
  return Origin;
};
