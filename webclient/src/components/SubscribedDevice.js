import React, { Component } from 'react';

import './subscribedDevice.css';

class SubscribedDevice extends Component {

  render () {
    const { device } = this.props;

    return (
      <div className="subscribedDevice">
        <b>{device}</b> subscribed...
      </div>
    );
  }
}

export default SubscribedDevice;
