import "dotenv/config";

export default {
  PORT: process.env.PORT,
  MONGO_ATLAS_URL: process.env.MONGO_ATLAS_URL,
  CLIENT_ID_GITHUB: process.env.CLIENT_ID_GITHUB,
  CLIENT_SECRET_GITHUB: process.env.CLIENT_SECRET_GITHUB,
  ENV: process.env.ENV,
  EMAIL: process.env.EMAIL,
  PASSWORD: process.env.PASSWORD,
};
