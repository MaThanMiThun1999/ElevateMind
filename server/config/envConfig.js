require('dotenv').config();

if (
  !process.env.PORT &&
  !process.env.MONGODB_URI &&
  !process.env.JWT_SECRET &&
  !process.env.CLIENT_URL &&
  !process.env.MAILER_EMAILID &&
  !process.env.MAILER_PASSWORD &&
  !process.env.VERSION &&
  !process.env.NODE_ENV &&
  !process.env.CLOUDINARY_CLOUD_NAME &&
  !process.env.CLOUDINARY_API_KEY &&
  !process.env.CLOUDINARY_API_SECRET &&
  !process.env.GOOGLE_CLIENT_ID &&
  !process.env.GOOGLE_CLIENT_SECRET &&
  !process.env.SUPPORT_MAIL
) {
  throw new Error('Missing environment variable');
}

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/ElevateMind',
  JWT_SECRET: process.env.JWT_SECRET,
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  MAILER_EMAILID: process.env.MAILER_EMAILID,
  MAILER_PASSWORD: process.env.MAILER_PASSWORD,
  NODE_ENV: process.env.NODE_ENV || 'development',
  VERSION: process.env.VERSION,
  APP_NAME: process.env.APP_NAME || 'ElevateMind',
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  SUPPORT_MAIL: process.env.SUPPORT_MAIL || 'mathanmithun8838@gmail.com',
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
};
