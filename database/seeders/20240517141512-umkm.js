"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Umkms",
      [
        {
          name: "Boutique Cemal Cemil",
          owner: "Lia Yulia Astuti",
          noUmkm: "087879466745",
          description:
            "Boutique Cemal Cemil, yang dikelola oleh Lia Yulia Astuti, telah menjadi bagian dari keseharian warga sejak tahun 2017 di Perumahan Gading City RT 44, Jln Sepinggan Pratama Blok G di G13 No.10, Balikpapan. Menyajikan beragam cemilan lezat seperti sotang, kimbab, es teh manis, sareh, dan susu kurma, Boutique Cemal Cemil menawarkan pengalaman kuliner yang memikat bagi pelanggan setianya. Dibuka setiap hari mulai pukul 10.00 pagi, pembayaran dapat dilakukan dengan tunai atau menggunakan QRIS. Pemesanan bisa dilakukan secara langsung di warung maupun melalui platform online, memberikan kenyamanan bagi pelanggan yang ingin menikmati cemilan berkualitas dari Boutique Cemal Cemil.",
          imageUrl:
            "https://ik.imagekit.io/AliRajab03/IMG-1715955244091._1LN_Xg5FT.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Warmob Bu Yuni",
          owner: "Ibu Yuni",
          noUmkm: "085251310979",
          description:
            'Warmob Bu Yuni, yang dimiliki oleh Ibu Yuni dan berdiri sejak Desember 2012, berlokasi di Perumahan Gading City RT 44, Jln Sepinggan Pratama Blok G di G4 No.5, Balikpapan. Dengan slogan ECO "Enak dan Cocok" dengan harga terjangkau, Warmob Bu Yuni menawarkan berbagai pilihan makanan seperti nasi kuning, nasi pecel, nasi ayam, ikan lalapan, lontong sayur, bubur ayam, dan risol. Warung ini buka mulai pukul 06.30 hingga habis dan menerima pembayaran secara tunai serta transfer bank. Pemesanan dapat dilakukan secara offline di lokasi, melalui WhatsApp, serta melalui platform GoFood dan ShopeeFood, menjadikannya pilihan yang mudah dan praktis bagi para pelanggan yang ingin menikmati hidangan lezat dan terjangkau.',
          imageUrl:
            "https://ik.imagekit.io/AliRajab03/IMG-1715954540759._18b2ezpxX.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "02kitchen",
          owner: "Dwita Lisviyantari",
          noUmkm: "081254940524",
          description:
            '02kitchen, yang dimiliki oleh Dwita Lisviyantari dan berdiri sejak 2 Januari 2021, berlokasi di Perumahan Gading City RT 44, Jln Sepinggan Pratama Blok G di G1 No.7, Balikpapan. Dengan slogan "Sejahtera Bersama Sahabat UMKM", 02kitchen menawarkan produk unggulan berupa bolen dan bolu marmer yang lezat. Warung ini buka setiap hari mulai pukul 08.00 hingga 16.00 dan menerima pembayaran secara tunai serta transfer bank. Pemesanan dapat dilakukan melalui WhatsApp, membuatnya mudah diakses oleh pelanggan yang ingin menikmati kue-kue berkualitas dari 02kitchen.',
          imageUrl:
            "https://ik.imagekit.io/AliRajab03/IMG-1715955548770._awcHqyde5.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Pawon Wukir",
          owner: "Tri Wukir Rahayu",
          noUmkm: "081346507675",
          description:
            "Pawon Wukir, milik Tri Wukir Rahayu, berdiri kokoh sejak tahun 2016 di Perumahan Gading City RT 44, Jln Sepinggan Pratama Blok G di G4 No.3, Balikpapan. Menghidangkan beragam hidangan lezat, mulai dari nasi uduk, soto, bihun, donat, tahu bakso, sosis solo, hingga tempe mendoan, Pawon Wukir menjadi tempat favorit bagi pencinta kuliner. Dibuka setiap hari sejak pukul 6.00 pagi hingga selesai, warung ini menerima pembayaran tunai dan transfer. Pemesanan dapat dilakukan melalui WhatsApp atau dengan datang langsung ke lokasi, memastikan kemudahan bagi pelanggan untuk menikmati hidangan lezat dari Pawon Wukir.",
          imageUrl:
            "https://ik.imagekit.io/AliRajab03/IMG-1715954940744._WhB4CE2BO.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Umkms", null, {});
  },
};
