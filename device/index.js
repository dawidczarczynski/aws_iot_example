const { downloadCertificates, checkIfCertsExists } = require('./certificates');
const connectDevice = require('./device');
const { DEVICE_NAME, RECONNECT_TIME_IN_SECONDS } = require('./config');

console.log('Starting device...');
console.log('\x1b[33m', '🚀  Device Name:', DEVICE_NAME, '\x1b[0m');

let connectionInterval = setInterval(async () => {
    try {
        if (checkIfCertsExists()) {
            console.log('Certificates exists...');

            clearInterval(connectionInterval);
            connectDevice();
        } else {
            console.log('Certificates do not exist');
            await downloadCertificates();
            console.log('Device will try to reconnect...');
        }
    } catch (ex) {
        console.error(ex.message);
        console.log(`Device will try to reconnect in ${RECONNECT_TIME_IN_SECONDS} seconds...`);
    }
}, RECONNECT_TIME_IN_SECONDS * 1000);
