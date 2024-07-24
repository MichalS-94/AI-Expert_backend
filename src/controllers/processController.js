const restreamerService = require("../services/restreamerService");
const { logger } = require("../components/logger");

const createProcess = async (
  camera_ip,
  channel,
  url,
  camera_user,
  camera_password,
  username,
  password
) => {
  try {
    const token = await restreamerService.getAuthToken(url, username, password);
    const process_id = `${camera_ip}_${channel}`.replace(/[\W_]+/g, "-");
    const exists = await restreamerService.isProcessExists(
      token,
      process_id,
      url
    );
    if (exists) {
      logger.log("info", `Process with ID ${process_id} already exists`);
    } else {
      await restreamerService.createStream(
        token,
        camera_ip,
        channel,
        url,
        camera_user,
        camera_password
      );
      await restreamerService.createSnapshot(token, camera_ip, channel, url);
    }
  } catch (error) {
    logger.log("error", `Error creating process: ${error}`);
  }
};

const listProcesses = async (url, username, password) => {
  try {
    const token = await restreamerService.getAuthToken(url, username, password);
    const processes = await restreamerService.getProcesses(token, url);
    const processList = restreamerService.processesToList(processes);
    logger.log("info", `Ongoing processes: ${JSON.stringify(processList)}`);
  } catch (error) {
    logger.log("error", `Error listing processes: ${error}`);
  }
};

const removeProcess = async (username, password, process_id, url) => {
  try {
    const token = await restreamerService.getAuthToken(url, username, password);
    const exists = await restreamerService.isProcessExists(
      token,
      process_id,
      url
    );
    if (exists) {
      await restreamerService.deleteProcess(token, url, process_id);
    } else {
      logger.log("warn", `Process with ID ${process_id} does not exist`);
    }
  } catch (error) {
    logger.log("error", `Error removing processes: ${error}`);
  }
};

module.exports = {
  createProcess,
  listProcesses,
  removeProcess,
};
