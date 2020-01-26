const { downloadCertificates, checkIfCertsExists } = require('./certificates');
const connectDevice = require('./device');
const { DEVICE_NAME } = require('./config');

(async () => {
    try {
        console.log('Starting device...');
        console.log('\x1b[33m', '🚀  Device Name:', DEVICE_NAME, '\x1b[0m');

        const certificatesExists = checkIfCertsExists();
        if (certificatesExists) {
            console.log('Certificates exists...');
        
            connectDevice();
        } else {
            console.log('Certificates do not exist');
        
            await downloadCertificates();
            connectDevice();
        }
    } catch (ex) {
        console.error(ex.message);
    }
})();
