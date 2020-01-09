const fs = require('fs');
const fetch = require('node-fetch');

const { 
  DEVICE_API, 
  DEVICE_NAME,
  CERTS_DIRECTORY,
  CERTS_FILES
} = require('./config');

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
    fs.mkdirSync(dirName);
    console.log("Directory created");
  } else {
    console.log("Directory already exists");
  }
} 

const downloadCertificates = async () => {
  console.log('Trying to download certificates...')

  try {
    const response = await fetch(`${DEVICE_API}/certificates/${DEVICE_NAME}`);
    if (response.ok) {
      const { urls } = await response.json();
      const certsDownloadPromises = urls.map(url => {
        const path = `${CERTS_DIRECTORY}/${getFileNameFromPath(url)}`
        return downloadFile(url, path)
      })
  
      createDirectory(CERTS_DIRECTORY);
      await Promise.all(certsDownloadPromises);
      console.log('Certificates downloaded sucessfully');
    } else {
      throw new Error(`Cannot fetch certificates for reason: ${response.statusText}`)
    }
  } catch (ex) {
    console.error(ex.message);
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