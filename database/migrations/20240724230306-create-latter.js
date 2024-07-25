'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Latters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      latterType: {
        type: Sequelize.ENUM
      },
      fullName: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.ENUM
      },
      placeDateBday: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM
      },
      religion: {
        type: Sequelize.STRING
      },
      work: {
        type: Sequelize.STRING
      },
      blood: {
        type: Sequelize.STRING
      },
      citizenship: {
        type: Sequelize.ENUM
      },
      nik: {
        type: Sequelize.STRING
      },
      nkk: {
        type: Sequelize.STRING
      },
      perpous: {
        type: Sequelize.STRING
      },
      destinationAddress: {
        type: Sequelize.STRING
      },
      numberFollower: {
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Latters');
  }
};