const { downloadCertificates, checkIfCertsExists } = require('./certificates');
const connectDevice = require('./device');

(async () => {
    try {
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
