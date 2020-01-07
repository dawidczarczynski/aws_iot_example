import React, { Component } from 'react';

class DevicesList extends Component {

    render() {
        const { devices } = this.props;
        return (
            <ul>
                { 
                    devices && devices.map(
                        device => (<li key={device.name}>Name: {device.name} <br/> ARN: {device.arn}</li>)
                    ) 
                }
            </ul>
      )
    }

}

export default DevicesList;
