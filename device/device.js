const awsIot = require('aws-iot-device-sdk');
const { IOT_HOST, DEVICE_NAME } = require('./config');
const { CERTS_FILES } = require('./constants');

const connectDevice = () => {
  const device = awsIot.device({
    ...CERTS_FILES,
    clientId: DEVICE_NAME,
    host: IOT_HOST
  });

  device.on('connect', () => {
    console.log('Device connected...');
    setInterval(
      () => {
        const message = { test_data: 1 };
        device.publish(
          'topic', 
          JSON.stringify(message), 
          {}, 
          () => console.log('Message has been published: ', message)
        );
      },
      3000
    );
  });

  device.on('error', error => console.error(error.message));  
}     

module.exports = connectDevice;
