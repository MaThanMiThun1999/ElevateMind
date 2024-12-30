require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("./config/logger");
const connectDB = require("./config/database");
const errorHandler = require("./middlewares/errorHandler");
const morgan = require("./middlewares/loggingMiddleware");
const cookieParser = require("cookie-parser");
const cron = require("node-cron");
const { VERSION, PORT, NODE_ENV, CLIENT_URL, APP_NAME } = require("./config/envConfig");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const checkInRoutes = require("./routes/checkIn.routes");
const { sendDailyCheckinReminder } = require("./services/emailService");
const User = require("./models/user.model");
const chatBotController = require("./controllers/common/ai.controller");

const app = express();

connectDB()
  .then(() => {
    logger.info("Database connected successfully".green.bold);
  })
  .catch((error) => {
    logger.error("Database connection failed".red.bold, error.message);
    process.exit(1);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan);

const corsOptions = {
  origin: NODE_ENV === "production" ? CLIENT_URL : "http://localhost:8000",
  credentials: true,
};
console.log("%c Line:51 🌮 CLIENT_URL", "color:#42b983", CLIENT_URL);
app.use(cors(corsOptions));
logger.info("Middlewares loaded successfully".green.bold);

app.get("/", (req, res) => {
  res.send({
    success: true,
    message: `Welcome to ${APP_NAME}'s API`,
  });
});

app.use(`/api/${VERSION}/auth`, authRoutes);
app.use(`/api/${VERSION}/user`, userRoutes);
app.use(`/api/${VERSION}/check-in`, checkInRoutes);
app.use(`/api/${VERSION}/bot`, chatBotController);

logger.info("Routes registered successfully".green.bold);

app.use(errorHandler);

app.use((req, res, next) => {
  console.log("Incoming request:", req.headers);
  next();
});

app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// 09:00AM
cron.schedule("0 9 * * *", async () => {
  try {
    const users = await User.find({ "preferences.notifications": true });
    console.log("%c Line:75 🍷 users", "color:#b03734", users);
    for (const user of users) {
      await sendDailyCheckinReminder(user);
    }
  } catch (error) {
    console.error("Error in cron job:", error);
  }
});

const server = app.listen(PORT, () => {
  logger.info(`Server running in ${NODE_ENV} mode on http://localhost:${PORT}`.yellow.bold);
});

const shutdown = () => {
  logger.info("Gracefully shutting down...".red.bold);
  server.close(() => {
    logger.info("Closed out remaining connections.".red.bold);
    process.exit(0);
  });

  setTimeout(() => {
    logger.error("Forcefully shutting down due to timeout.".red.bold);
    process.exit(1);
  }, 60000);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
