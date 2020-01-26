const fs = require('fs');
const fetch = require('node-fetch');

const { DEVICE_API, DEVICE_NAME } = require('./config');
const { CERTS_DIRECTORY, CERTS_FILES } = require('./constants');

const getFileNameFromPath = path => 
  path
    .split('/')
    .pop()
    .split('?')
    .shift();

const downloadFile = async (url, path) => {
  const { body } = await fetch(url);
  const fileStream = fs.createWriteStream(path);

  await new Promise((resolve, reject) => {
      body.pipe(fileStream);
      body.on("error", err => reject(err));
      fileStream.on("finish", () => resolve());
  });
};

const createDirectory = dirName => {
  console.log("Creating directory...")
 
  const directoryExists = fs.existsSync(dirName);

  if (!directoryExists) {
    fs.mkdirSync(dirName, { recursive: true });
    console.log("Directory created");
  } else {
    console.log("Directory already exists");
  }
} 

const downloadCertificates = async () => {
  console.log('Trying to download certificates...')

  const response = await fetch(`${DEVICE_API}/certificates/${DEVICE_NAME}`);
  
  if (response.ok) {
    const { urls } = await response.json();
    const certsDownloadPromises = urls.map(url => {
      const path = `${CERTS_DIRECTORY}/${DEVICE_NAME}/${getFileNameFromPath(url)}`
      return downloadFile(url, path)
    })

    createDirectory(`${CERTS_DIRECTORY}/${DEVICE_NAME}`);
    await Promise.all(certsDownloadPromises);

    console.log('Certificates downloaded sucessfully');
  } else {
    const error = response.status === 404 
      ? "Device is not registered yet" 
      : response.statusText;

    throw new Error(`Cannot fetch certificates for reason: ${error}`)
  }
}

const checkIfCertsExists = () =>
    Object
        .values(CERTS_FILES)
        .reduce((exists, filePath) => exists && fs.existsSync(filePath), true);
   

module.exports = {
  downloadCertificates,
  checkIfCertsExists
};
