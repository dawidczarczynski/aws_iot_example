import React, { Component } from 'react';

import './deviceMessages.css'

class DeviceMessages extends Component {

    render() {
        const { messages } = this.props;

        return (
            <div className="deviceMessages">
                {!messages.length && (
                    <h2>No messages to display</h2>
                )}
                <ul className="deviceMessagesList">
                    { messages.map((message, i) => 
                        <li 
                            className="deviceMessage" 
                            key={i}>
                                { JSON.stringify(message, null, 4) }
                        </li>
                    )}
                </ul>
            </div>
        )
    }

}

export default DeviceMessages;
