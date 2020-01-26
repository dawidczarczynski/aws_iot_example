const { getDeviceNameFromParams } = require('./utils');

const DEVICE_API = 'https://tjpsib5n4b.execute-api.eu-west-2.amazonaws.com/dev/device';
const DEVICE_NAME = getDeviceNameFromParams() || 'unnamed_device';
const IOT_HOST = 'a19u5yppb1mzcy-ats.iot.eu-west-2.amazonaws.com';
const RECONNECT_TIME_IN_SECONDS = 10;

module.exports = {
  DEVICE_API,
  DEVICE_NAME,
  IOT_HOST,
  RECONNECT_TIME_IN_SECONDS
};
