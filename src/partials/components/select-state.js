import React, { Component } from 'react';

class StateSelect extends Component {
    render () {
        return (
            <select id="state-select" onChange={this.props.updateState}>
                {this.props.stateList.slice(1).map((item) => (
                    <option key={item.value} value={item.value}>{item.label}</option>
                ))}
            </select>
        );
    }
}

export default StateSelect;