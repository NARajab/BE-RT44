const qrcode = require("qrcode-terminal");
const fs = require("fs");
// const { Client, LocalAuth } = require("whatsapp-web.js");

const client = new Client({
  authStrategy: new LocalAuth({
    dataPath: "sessions",
  }),
  webVersionCache: {
    type: "remote",
    remotePath:
      "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
  },
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});
client.on("error", (error) => {
  console.error("Client Error:", error);
});

client.on("disconnected", (reason) => {
  console.log("Client was logged out", reason);
});
const sendTextMessage = async (phoneNumber, message) => {
  try {
    let phoneNumberNew;

    if (phoneNumber.startsWith("0")) {
      phoneNumberNew = phoneNumber.substring(1);
      const chat = await client.getChatById(`62${phoneNumberNew}@c.us`);
      await chat.sendMessage(message);
    } else {
      phoneNumberNew = phoneNumber;
      const chat = await client.getChatById(`${phoneNumberNew}@c.us`);
      await chat.sendMessage(message);
    }

    console.log(`Pesan terkirim ke ${phoneNumber}: ${message}`);
  } catch (error) {
    console.error("Gagal mengirim pesan:", error);
  }
};

const sendSuccessMessageForgotePassword = async (phoneNumber) => {
  const welcomeMessage = "Perubahan kata sandi anda berhasil";
  await sendTextMessage(phoneNumber, welcomeMessage);
};
const sendSuccessMessageUpdateProfile = async (phoneNumber) => {
  const welcomeMessage = "Profil anda telah diperbaharui";
  await sendTextMessage(phoneNumber, welcomeMessage);
};
const sendSuccessMessageTransaction = async (phoneNumber) => {
  const welcomeMessage = "Pembayaran anda telah berhasil";
  await sendTextMessage(phoneNumber, welcomeMessage);
};
const sendMessageDues = async (phoneNumber) => {
  const welcomeMessage = `
📢 [Penting] Pengingat Pembayaran Iuran Bulanan RT 44 📢

Halo warga RT 44 yang terhormat,

Kami ingin mengingatkan kepada seluruh warga RT 44 untuk segera melakukan pembayaran iuran bulanan.

Terima kasih atas perhatiannya dan partisipasi aktif Anda dalam mendukung kegiatan RT 44!

Salam hangat,
[Ketua RT 44]
`;
  await sendTextMessage(phoneNumber, welcomeMessage);
};
const sendMessageLatterToRt = async (phoneNumber) => {
  const welcomeMessage = `
📢 Pemberitahuan Surat Belum Diverifikasi 📢

Halo Pak RT yang terhormat,

Kami ingin memberitahukan bahwa terdapat surat yang belum diverifikasi oleh Anda.

Mohon segera melakukan verifikasi terhadap surat yang belum diverifikasi agar dapat segera diproses.

Salam hangat,
[Warga RT 44]
`;
  await sendTextMessage(phoneNumber, welcomeMessage);
};

const sendMessageToWarga = async (phoneNumber) => {
  const message = `
📢 Pemberitahuan Surat Sudah Diverifikasi 📢

Halo Warga RT 44 yang terhormat,

Kami ingin memberitahukan bahwa surat Anda telah diverifikasi dan diproses dengan segera.

Salam hangat,
[Ketua RT 44]
`;
  await sendTextMessage(phoneNumber, message);
};

module.exports = {
  client,
  sendTextMessage,
  sendSuccessMessageForgotePassword,
  sendSuccessMessageUpdateProfile,
  sendSuccessMessageTransaction,
  sendMessageDues,
  sendMessageLatterToRt,
  sendMessageToWarga,
};
