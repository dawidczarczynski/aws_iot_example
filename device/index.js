const fs = require('fs');
const awsIot = require('aws-iot-device-sdk');

const CERTS_DIR = './certs';
const CERTS_FILES = {
    key: 'private.pem',
    cert: 'certificate.pem',
    ca: 'rootCA.pem'
};

const checkIfCertsExists = () =>
    Object.values(CERTS_FILES)
        .map(file => `${CERTS_DIR}/${file}`)
        .reduce((exists, filePath) => exists && fs.existsSync(filePath), false);

if (checkIfCertsExists()) {
    const device = awsIot.device({
        keyPath: './certs/private.pem',
        certPath: './certs/certificate.pem',
        caPath: './certs/rootCA.pem',
        clientId: 'client-id-1',
        host: 'a19u5yppb1mzcy-ats.iot.eu-west-2.amazonaws.com'
      });
      
      device.on('connect', () => {
        console.log('Device connected...');
        setInterval(
          () => device.publish('topic', JSON.stringify({ test_data: 1 })),
          3000
        );
      });
      
      device.on('error', error => console.error(error.message));
} else {
    console.log('Certificates do not exist');
}
