const DEVICE_API = '';
const DEVICE_NAME = '';
const IOT_HOST = '';
const CERTS_DIRECTORY = './certs';
const CERTS_FILES = {
  keyPath: `${CERTS_DIRECTORY}/privateKey.pem`,
  certPath: `${CERTS_DIRECTORY}/certificate.pem`,
  caPath: `${CERTS_DIRECTORY}/rootCA.pem`
};

module.exports = {
  DEVICE_API,
  DEVICE_NAME,
  IOT_HOST,
  CERTS_DIRECTORY,
  CERTS_FILES
};
