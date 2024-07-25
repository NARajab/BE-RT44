const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const cron = require("node-cron");
const { databaseValidation } = require("./config/database");
const { createDuesObligat } = require("./app/controller/duesController");
// const WhatsappMessage = require("./app/controller/messageController");
const ApiError = require("./utils/apiError");
const errorHandler = require("./app/controller/errorController");
const router = require("./app/routes");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.use(router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.all("*", (req, res, next) => {
  next(new ApiError("Routes does not exist", 404));
});

app.use(errorHandler);

console.log("Starting server...");

databaseValidation()
  .then(() => {
    console.log("Database validation complete.");
    // WhatsappMessage.initializeClient();

    cron.schedule(
      "0 0 1 * *",
      async () => {
        console.log("Cron job started...");
        await new Promise((resolve) => setTimeout(resolve, 5000));
        createDuesObligat();
      },
      {
        scheduled: true,
        timezone: "Asia/Jakarta",
      }
    );

    const { PORT = 3000, HOST = "localhost" } = process.env;

    app.listen(PORT, () => {
      console.log(`Server is running at http://${HOST}:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to validate database connection:", err);
  });

module.exports = app;
