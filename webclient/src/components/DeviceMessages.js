import React, { Component } from 'react';

class DeviceMessages extends Component {

    render() {
        const { messages } = this.props;

        return (
            <ul>
                { messages.map((message, i) => <li key={i}>{message.device} - {message.test_data}</li>)}
            </ul>
        )
    }

}

export default DeviceMessages;
