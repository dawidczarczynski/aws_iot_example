import React, { Component } from 'react';

import './devicesList.css'

class DevicesList extends Component {

    render() {
        const { devices } = this.props;
        return (
            <div className="deviceListContainer">
                <ul className="deviceList">
                    { 
                        devices && devices.map(
                            device => (
                                <li 
                                    className="deviceListItem"
                                    key={device.name}>
                                        Name: {device.name} <br/> ARN: {device.arn}
                                </li>
                            )
                        ) 
                    }
                </ul>
            </div>
      )
    }

}

export default DevicesList;
