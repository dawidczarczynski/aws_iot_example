import React, { Component } from 'react';
import DevicesList from './components/DevicesList';
import { getDevicesList, registerNewDevice } from './graphql/devicesApi';
import NewDevice from './components/NewDevice';

class App extends Component {

  constructor() {
    super();
    this.state = { devices: null };
    this.registerDevice = this.registerDevice.bind(this);
  }

  componentDidMount() {
    getDevicesList()
      .then(devices => this.setState({ devices }));
  }

  registerDevice(name) {
    registerNewDevice(name)
      .then(device => this.setState({ devices: [...this.state.devices, device ]}));
  }

  render() {
    const { devices } = this.state;

    return (
      <>
        <DevicesList devices={devices} />
        <NewDevice onSave={this.registerDevice} />
      </>
    );
  }

}

export default App;
