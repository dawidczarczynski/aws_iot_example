import React, { Component } from 'react';

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
            <form onSubmit={this.handleSubmit}>
                <label>
                    Device name:
                    <input type="text" name="name" value={name} onChange={this.handleNameChange} />
                </label>
                <input type="submit" value="Add device" />
            </form>
        );
    }

}

export default NewDevice;
