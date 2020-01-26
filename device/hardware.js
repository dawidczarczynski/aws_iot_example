const { Gpio } = require('onoff');

const DEVICE_STATUS_LED = new Gpio(17, 'out');
const CONNECTION_STATUS_LED = new Gpio(27, 'out');
const MESSAGE_LED = new Gpio(22, 'out');
const SENSOR = new Gpio(7, 'in');

const signalizeDeviceReadiness = () => {
    DEVICE_STATUS_LED.writeSync(1);
}

const signalizeConnectionStatus = isConnected => {
    CONNECTION_STATUS_LED.writeSync(1);
    if (!isConnected) {
        setTimeout(() => CONNECTION_STATUS_LED.writeSync(0), 500);
    }
}

const signalizeMessagePublication = () => {
    MESSAGE_LED.writeSync(1);
    setTimeout(() => MESSAGE_LED.writeSync(0), 1000);
}

const readSensorStatus = () => SENSOR.readSync();

const clearHardware = () => {
    SENSOR.unexport();
    DEVICE_STATUS_LED.unexport();
    CONNECTION_STATUS_LED.unexport();
    MESSAGE_LED.unexport();
}

module.exports = {
    signalizeDeviceReadiness,
    signalizeConnectionStatus,
    signalizeMessagePublication,
    readSensorStatus,
    clearHardware
}
 
