import { API, graphqlOperation } from 'aws-amplify';
import awsconfig from '../aws-exports';

import { listDevices } from './listDevicesQuery';
import { registerDeviceMutation } from './registerDeviceMutation';

API.configure(awsconfig)

export const getDevicesList = async () => {
    console.log('fetching devices list...');

    const queryOperation =  graphqlOperation(listDevices);

    return API.graphql(queryOperation)
      .then(response => response.data.allDevices)
      .then(devices => { 
        console.log('devices fetched', devices)
        return devices;
      });
};

export const registerNewDevice = async (name) => {
  console.log('creating new device...');

  const mutationOperation = graphqlOperation(registerDeviceMutation(name));

  return API.graphql(mutationOperation)
    .then(response => response.data.createDevice)
    .then(device => {
      console.log('device created', device);
      return device;
    });
};