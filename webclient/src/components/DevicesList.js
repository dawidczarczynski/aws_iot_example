import React, { Component } from 'react';

import './devicesList.css'

class DevicesList extends Component {

    constructor(props) {
        super(props);
        this.state = { selectedDevice: null };
        this.selectDevice = this.selectDevice.bind(this);
    }

    selectDevice({ name, arn }) {
        this.setState({ selectedDevice: arn });
        this.props.selectDevice(name);
    }

    render() {
        const { devices } = this.props;
        const { selectedDevice } = this.state;

        return (
            <div className="deviceListContainer">
                <ul className="deviceList">
                    { 
                        devices && devices.map(
                            device => (
                                <li 
                                    className={`deviceListItem ${ device.arn === selectedDevice ? "active" : "inactive" }`}
                                    key={device.name}
                                    onClick={() => this.selectDevice(device)} >
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
