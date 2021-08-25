import React, { Component } from 'react';

class FilterBarSelect extends Component {
    render () {
        return (
            <div className="ships-checkbox-container">
                <input type="checkbox" id="shipSelect" checked={this.props.shipsSelected} onChange={this.props.updateShips} /><p>Select to search for Navy and Coast Guard ships</p>
            </div>
        );
    }
}

export default FilterBarSelect;