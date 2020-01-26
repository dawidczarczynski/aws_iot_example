const { DEVICE_NAME } = require('./config');

const CERTS_DIRECTORY = 'certs';
const CERTS_FILES = {
  keyPath: `${CERTS_DIRECTORY}/${DEVICE_NAME}/privateKey.pem`,
  certPath: `${CERTS_DIRECTORY}/${DEVICE_NAME}/certificate.pem`,
  caPath: `${CERTS_DIRECTORY}/${DEVICE_NAME}/rootCa.pem`
};

module.exports = {
  CERTS_DIRECTORY,
  CERTS_FILES
};
