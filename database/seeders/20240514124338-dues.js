"use strict";
const { Dues, User, UserDues } = require("../../app/models");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    const currentYear = now.getFullYear();
    const monthNames = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    const currentMonthIndex = now.getMonth();

    const duesDataArray = [
      {
        duesName: `${monthNames[currentMonthIndex]} ${currentYear}`,
        duesType: "Wajib",
        price: 150000,
      },
      {
        duesName: `${monthNames[(currentMonthIndex + 1) % 12]} ${currentYear}`,
        duesType: "Wajib",
        price: 150000,
      },
      {
        duesName: `${monthNames[(currentMonthIndex + 2) % 12]} ${currentYear}`,
        duesType: "Wajib",
        price: 150000,
      },
    ];

    try {
      const createdDuesArray = await Promise.all(
        duesDataArray.map((duesData) => Dues.create(duesData))
      );

      const users = await User.findAll({
        where: {
          role: "member",
        },
      });

      const userDuesPromises = [];
      for (const createdDues of createdDuesArray) {
        for (const user of users) {
          userDuesPromises.push(
            UserDues.create({
              userId: user.id,
              duesId: createdDues.id,
            })
          );
        }
      }

      await Promise.all(userDuesPromises);
    } catch (err) {
      console.error("Error creating dues obligations:", err);
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    const now = new Date();
    const currentYear = now.getFullYear();
    const monthNames = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    const currentMonthIndex = now.getMonth();

    const duesNames = [
      `${monthNames[currentMonthIndex]} ${currentYear}`,
      `${monthNames[(currentMonthIndex + 1) % 12]} ${currentYear}`,
      `${monthNames[(currentMonthIndex + 2) % 12]} ${currentYear}`,
    ];

    try {
      // Find the dues entries
      const duesEntries = await Dues.findAll({
        where: { duesName: duesNames },
      });

      if (duesEntries.length > 0) {
        const duesIds = duesEntries.map((dues) => dues.id);

        await UserDues.destroy({ where: { duesId: duesIds } });

        await Dues.destroy({ where: { id: duesIds } });
      }
    } catch (err) {
      console.error("Error deleting dues obligations:", err);
      throw err;
    }
  },
};
