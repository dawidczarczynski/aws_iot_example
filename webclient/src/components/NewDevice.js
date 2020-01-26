import React, { Component } from 'react';

import './newDevice.css';

class NewDevice extends Component {

    constructor(props) {
        super(props);
        this.state = { name: '' };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    }

    handleSubmit(event) {
        this.props.onSave(this.state.name);
        event.preventDefault();
    }

    render() {
        const { name } = this.state;
        return (
            <div className="newDevice">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Device name..." name="name" value={name} onChange={this.handleNameChange} />
                    <input type="submit" value="Add device" />
                </form>
            </div>
        );
    }

}

export default NewDevice;
