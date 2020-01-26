import React, { Component } from 'react';
import DevicesList from './components/DevicesList';
import NewDevice from './components/NewDevice';
import DeviceMessages from './components/DeviceMessages';
import { getDevicesList, registerNewDevice, getDeviceMessages } from './graphql/devicesApi';

import './layout.css';

class App extends Component {

  constructor() {
    super();
    this.state = { devices: null, messages: [] };
    this.registerDevice = this.registerDevice.bind(this);
  }

  componentDidMount() {
    getDevicesList()
      .then(devices => this.setState({ devices }));

    getDeviceMessages("test1").subscribe({
      next: response => {
        const { messages } = this.state;
        const message = response.value.data.publishedDeviceMessage;

        console.log('Device message received:', message);

        this.setState({ messages: [ message, ...messages ]});
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
      <div className="container">
        <div className="leftPanel">
          <DeviceMessages messages={messages} />
        </div>
        <div className="rightPanel">
          <DevicesList devices={devices} />
          <NewDevice onSave={this.registerDevice} />
        </div>
      </div>
    );
  }

}

export default App;
