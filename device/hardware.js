const { Gpio } = require('onoff');

const DEVICE_STATUS_LED = new Gpio(17, 'out');

export const signalizeDeviceReadiness = isReady => {
    if (isReady) {
        DEVICE_STATUS_LED.write(1);
    } else {
        DEVICE_STATUS_LED.write(0);
        DEVICE_STATUS_LED.unexport();
    }
}