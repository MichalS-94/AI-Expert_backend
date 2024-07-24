require("dotenv").config({ path: `../.env` });

module.exports = {
  RESTREAMER_URL: process.env.RESTREAMER_URL,
  RESTREAMER_USER: process.env.RESTREAMER_USER,
  RESTREAMER_PASSWORD: process.env.RESTREAMER_PASSWORD,
  CAMERA_IP: process.env.CAMERA_IP,
  CHANNEL: process.env.CHANNEL,
  CAMERA_USER: process.env.CAMERA_USER,
  CAMERA_PASSWORD: process.env.CAMERA_PASSWORD,
};
