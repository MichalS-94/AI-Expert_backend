const config = require("./config/config");

const processController = require("./controllers/processController");

const main = async () => {
  console.log(config);
  await processController.createProcess(
    config.CAMERA_IP,
    config.CHANNEL,
    config.RESTREAMER_URL,
    config.CAMERA_USER,
    config.CAMERA_PASSWORD,
    config.RESTREAMER_USER,
    config.RESTREAMER_PASSWORD
  );
  await processController.removeProcess(
    config.RESTREAMER_USER,
    config.RESTREAMER_PASSWORD,
    "process_id",
    config.RESTREAMER_URL
  );
  await processController.listProcesses(
    config.RESTREAMER_URL,
    config.RESTREAMER_USER,
    config.RESTREAMER_PASSWORD
  );
};

main();
