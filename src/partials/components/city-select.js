import React, { Component } from 'react';

class CitySelect extends Component {
    render () {
        return (
            <select id="city-select" onChange={this.props.updateCity}>
                {this.props.filteredArray.map((item) => (
                    <option key={item.value} value={item.value}>{item.label}</option>
                ))}
            </select>
        );
    }
}

export default CitySelect;