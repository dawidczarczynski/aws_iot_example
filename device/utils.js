const getDeviceNameFromParams = () => {
  return process.argv
    .find(arg => /^name=/.test(arg))
    .replace("name=", "")
}

module.exports = { getDeviceNameFromParams };
