'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     
      await queryInterface.bulkInsert('Converters', [{
        path: '/Users/macbook/elbrus/converterRFM/src/convertedFiles/csv-1633683049464.csv',
        originId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),

      }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
