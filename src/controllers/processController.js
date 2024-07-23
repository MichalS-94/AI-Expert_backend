const restreamerService = require("../services/restreamerService");

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
    const [exists, process_id] = await restreamerService.isProcessExists(
      token,
      camera_ip,
      channel,
      url
    );
    if (exists) {
      console.info(`Process with ID ${process_id} already exists`);
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
    console.error("Error creating process:", error);
  }
};

const listProcesses = async (url, username, password) => {
  try {
    const token = await restreamerService.getAuthToken(url, username, password);
    const processes = await restreamerService.getProcesses(token, url);
    const processList = restreamerService.processesToList(processes);
    console.log(`Ongoing processes: ${JSON.stringify(processList)}`);
  } catch (error) {
    console.error("Error listing processes:", error);
  }
};

module.exports = {
  createProcess,
  listProcesses,
};
