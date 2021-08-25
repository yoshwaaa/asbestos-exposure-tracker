import React, { Component } from 'react';
import Select from 'react-select';
import StateSelect from './select-state';
import CitySelect from './city-select';
import {filteredCityData} from '../helper-functions/filter-city-data'

class FilterBar extends Component {
    filterCityData = () => {
        filteredCityData(this.props.rawAppData);
    }
    render () {

        ////////////////////////////
        // Conditional render for desktop/tablet
        ////////////////////////////

        var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
        if (this.props.allCityList !== false) {
            return (
            <div className="filter-bar-items">
            <Select
            options={this.props.stateList}
            onChange={this.props.updateState}
            value={this.props.selectedState}
            isSearchable={false}
            >
            </Select>
            <Select 
            onChange={this.props.updateCity}
            options={this.props.allCityList} 
            value={this.props.selectedCity}
            >
            </Select>
            <input
            placeholder="Search"
            onChange={this.props.searchList} value={this.props.filter}
            />
            </div>
            );
        }
        else if (viewportWidth > 700) {
            let adjustedCityData = this.props.rawAppData.map((a) => a.city).sort();
            adjustedCityData = adjustedCityData.map((a) => ({"value": a.toLowerCase(), "label": a}));
            adjustedCityData.unshift({value: '', label: 'All'});
            let filteredArr = adjustedCityData.reduce((acc, current) => {
                let x = acc.find(item => item.value === current.value);
                if (!x) {return acc.concat([current]);} else {return acc;}
            }, []);
            return (
                <div className="filter-bar-items">
                    <Select
                    options={this.props.stateList}
                    onChange={this.props.updateState}
                    value={this.props.selectedState}
                    isSearchable={false}
                    >
                    </Select>
                    <div className="city-bar-items">
                        <span>City</span>
                        <Select 
                        onChange={this.props.updateCity}
                        options={filteredArr} 
                        value={this.props.selectedCity}
                        >
                        </Select>
                    </div>
                    <span className="input-container">
                    <input
                    placeholder="Search"
                    onChange={this.props.searchList} value={this.props.filter}
                    />
                    </span>
              </div>
            );
        }
        
        ////////////////////////////
        // Conditional render for mobile
        ////////////////////////////

        else {
            // If Mobile Device
            let adjustedCityData = this.props.rawAppData.map((a) => a.city).sort();
            adjustedCityData = adjustedCityData.map((a) => ({"value": a.toLowerCase(), "label": a}));
            adjustedCityData.unshift({value: '', label: 'All'});
            let filteredArr = adjustedCityData.reduce((acc, current) => {
                let x = acc.find(item => item.value === current.value);
                if (!x) {return acc.concat([current]);} else {return acc;}
            }, []);
            return (
                <div className="filter-bar-items">
                    <StateSelect
                    updateState={this.props.updateState}
                    stateList={this.props.stateList}
                    />
                    <CitySelect
                    filteredArray={filteredArr}
                    updateCity={this.props.updateCity}
                    />
                    <input
                    placeholder="Search"
                    onChange={this.props.searchList} value={this.props.filter}
                    />
              </div>
            );
        }
    }
}

export default FilterBar;