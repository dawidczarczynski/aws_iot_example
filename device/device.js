const awsIot = require('aws-iot-device-sdk');
const { IOT_HOST, DEVICE_NAME } = require('./config');
const { CERTS_FILES } = require('./constants');
const { 
    signalizeConnectionStatus, 
    signalizeMessagePublication,
    readSensorStatus
} = require('./hardware');

const connectDevice = () => {
  const device = awsIot.device({
    ...CERTS_FILES,
    clientId: DEVICE_NAME,
    host: IOT_HOST
  });

  device.on('connect', () => {
    console.log('Device connected...');
    signalizeConnectionStatus(true);
    
    setInterval(
      () => {
        const test_data = Math.floor(Math.random() * 100) + 1; // readSensorStatus(); 
        const message = { device: DEVICE_NAME, message: { test_data }};

        device.publish(
          'iot/device', 
          JSON.stringify(message), 
          {}, 
          () => {
              console.log('Message has been published: ', message);
              signalizeMessagePublication();
          }
        );
	
      },
      3000
    );
  });

  device.on('error', error => console.error(error.message));  
}     

module.exports = connectDevice;
