import React, { Component } from 'react';
import DevicesList from './components/DevicesList';
import { getDevicesList, registerNewDevice, getDeviceMessages } from './graphql/devicesApi';
import NewDevice from './components/NewDevice';
import DeviceMessages from './components/DeviceMessages';

class App extends Component {

  constructor() {
    super();
    this.state = { devices: null, messages: [] };
    this.registerDevice = this.registerDevice.bind(this);
  }

  componentDidMount() {
    getDevicesList()
      .then(devices => this.setState({ devices }));

    getDeviceMessages("123456").subscribe({
      next: response => {
        const { messages } = this.state;
        const message = response.value.data.publishedDeviceMessage;

        console.log('Device message received:', message);

        this.setState({ messages: [ ...messages, message ]});
      }
    })
  }

  registerDevice(name) {
    registerNewDevice(name)
      .then(device => this.setState({ devices: [...this.state.devices, device ]}));
  }

  render() {
    const { devices, messages } = this.state;

    return (
      <>
        <DevicesList devices={devices} />
        <NewDevice onSave={this.registerDevice} />
        <DeviceMessages messages={messages} />
      </>
    );
  }

}

export default App;
