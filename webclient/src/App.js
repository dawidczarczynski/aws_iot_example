import React, { Component } from 'react';
import DevicesList from './components/DevicesList';
import NewDevice from './components/NewDevice';
import DeviceMessages from './components/DeviceMessages';
import { getDevicesList, registerNewDevice, getDeviceMessages } from './graphql/devicesApi';

import './layout.css';
import SubscribedDevice from './components/SubscribedDevice';

class App extends Component {

  constructor() {
    super();
    this.state = { devices: null, subscribedDevice: null, messages: [] };
    this.subscription = null;
    this.registerDevice = this.registerDevice.bind(this);
    this.subscribeForDevice = this.subscribeForDevice.bind(this);
  }

  componentDidMount() {
    getDevicesList()
      .then(devices => this.setState({ devices }));
  }

  registerDevice(name) {
    registerNewDevice(name)
      .then(device => this.setState({ devices: [...this.state.devices, device ]}));
  }

  subscribeForDevice(name) {
    const { subscribedDevice } = this.state;

    if (name === subscribedDevice) {
      return;
    }

    if (this.subscription) {
      this.subscription.unsubscribe();
      this.setState({ messages: [] });
    }

    this.subscription = getDeviceMessages(name)
      .subscribe({
        next: response => {
          const { messages } = this.state;
          const message = response.value.data.publishedDeviceMessage;

          console.log('Device message received:', message);
          
          this.setState({ messages: [ message, ...messages ]});
        }
      })

    this.setState({ subscribedDevice: name });
  }

  render() {
    const { subscribedDevice, devices, messages } = this.state;

    return (
      <div className="container">
        { subscribedDevice && (<SubscribedDevice device={subscribedDevice} />)}
        <div className="leftPanel">
          <DeviceMessages messages={messages} />
        </div>
        <div className="rightPanel">
          <DevicesList devices={devices} selectDevice={this.subscribeForDevice} />
          <NewDevice onSave={this.registerDevice} />
        </div>
      </div>
    );
  }

}

export default App;
