"use strict";

const { User } = require("../../app/models");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
dotenv.config();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        name: "KepalaRT",
        phoneNumber: "6285246918508",
        role: "superAdmin",
        nik: "1234567890123456",
        nkk: "3874563465743743",
        member: "5",
        address: "Spinggan Pratama",
        image:
          "https://tse2.mm.bing.net/th?id=OIP.U2iQ7wNK6ZzTW_traW_-PQHaHa&pid=Api&P=0&h=180",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "SekretarisRT",
        phoneNumber: "+628236576342564",
        role: "sekretaris",
        nik: "1234567890123456",
        nkk: "3874563465743743",
        member: "5",
        address: "Spinggan Pratama",
        image:
          "https://tse2.mm.bing.net/th?id=OIP.U2iQ7wNK6ZzTW_traW_-PQHaHa&pid=Api&P=0&h=180",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "BendaharaRT",
        phoneNumber: "+628236576342564",
        role: "bendahara",
        nik: "1234567890123456",
        nkk: "3874563465743743",
        member: "5",
        address: "Spinggan Pratama",
        placeDateBday: "Spinggan Pratama, 23 Juni 2001",
        image:
          "https://tse2.mm.bing.net/th?id=OIP.U2iQ7wNK6ZzTW_traW_-PQHaHa&pid=Api&P=0&h=180",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "member RT",
        nik: "1234567890123456",
        nkk: "3874563465743743",
        member: "5",
        phoneNumber: "081253611869",
        role: "member",
        address: "Spinggan Pratama",
        noHome: "102",
        placeDateBday: "Spinggan Pratama, 23 Juni 2001",
        image:
          "https://tse2.mm.bing.net/th?id=OIP.U2iQ7wNK6ZzTW_traW_-PQHaHa&pid=Api&P=0&h=180",
        gender: "Pria",
        blockHome: "G",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const adminPassword = process.env.PASSWORD_HASH;
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(adminPassword, saltRounds);

    const users = await User.findAll();

    await queryInterface.bulkInsert("Auths", [
      {
        email: "pakrt@mail.com",
        password: hashedPassword,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "sekretaris@mail.com",
        password: hashedPassword,
        userId: users[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "bendahara@mail.com",
        password: hashedPassword,
        userId: users[2].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "member@mail.com",
        password: hashedPassword,
        userId: users[3].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("Auths", null, {});
  },
};
