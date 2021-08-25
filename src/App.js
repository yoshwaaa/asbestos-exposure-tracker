import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

////////////////////////////
// Import components
////////////////////////////

import Pagination from './partials/components/pagination';
import FilterBar from './partials/components/filter-bar';
import ItemList from './partials/components/item-list';
import FilterBarLower from './partials/components/filter-bar-lower';
import FilterBarSelect from './partials/components/filter-bar-select';

////////////////////////////
// Import helper functions
////////////////////////////

import {updateCity} from './partials/helper-functions/update-city';
import {updatePagination} from './partials/helper-functions/update-pagination';
import {updateSearch} from './partials/helper-functions/update-search';
import {handleOutsideStateSelect} from './partials/helper-functions/outside-state-select';
import stateList from './partials/components/state-list';


class App extends Component {

  ////////////////////////////
  // Define state
  ////////////////////////////

  state = {
    products: [],
    filter: '',
    filteredProducts: [],
    offset: 0,
    value: 'al',
    totalPages: 0,
    pagination: 0,
    cityFilter: '',
    loading: false,
    selectedCity: [{"value": "none", "label": "Select or start typing..."}],
    selectedState: [{"value": "al", "label": "Alabama"}],
    shipsSelected: false,
    allCityList: false,
    allStatesSelected: false
  }

  ////////////////////////////
  // End define state
  ////////////////////////////

  //-------------------------------//

  ////////////////////////////
  // Load data
  ////////////////////////////

  componentDidMount() {
    this.setState({loading: true});
    let outsideStateSelect = window.location.href.indexOf("state") > -1 ? window.location.href.split('state=')[1] : 'al';
    if (document.getElementById("state-select")) {document.getElementById("state-select").value = outsideStateSelect;}
    axios.get(`/data/${outsideStateSelect}.json`)
    .then((response) => {
      this.setState({
        loading: false,
        products: response.data.results,
        filteredProducts: response.data.results,
        totalPages: Math.ceil(response.data.results.length / 15),
        value: outsideStateSelect,
        selectedState: [{"value": outsideStateSelect, "label": handleOutsideStateSelect(stateList, outsideStateSelect)}]
      });
    });
  }

  updateState = (stateSelection) => {
    let resizeStateSelection = document.getElementById("state-select") ? stateSelection.target.value : stateSelection.value;
    this.setState({
      loading: true,
      value: resizeStateSelection
    });
    let dataFetchString = `/data/${resizeStateSelection}.json`;
    axios.get(dataFetchString)
    .then((response) => {
      this.setState({
        loading: false,
        products: response.data.results,
        filteredProducts: response.data.results,
        filter: '',
        cityFilter: '',
        pagination: 0,
        totalPages: Math.ceil(response.data.results.length / 15),
        selectedCity: [{"value": "none", "label": "Select or start typing..."}],
        selectedState: [{"value": resizeStateSelection, "label": handleOutsideStateSelect(stateList, resizeStateSelection)}],
        shipsSelected: false

      });
    });
    if (resizeStateSelection === "all") {
      axios.get('/data/city-list.json')
      .then((response) => {
        this.setState({
          allCityList: response.data.results,
          allStatesSelected: true
        });
      });
    } else {
      this.setState({
        allCityList: false,
        allStatesSelected: false
      });
    }
  }

  updateShips = () => {
    if (this.state.shipsSelected) {
      this.setState({loading: true});
      axios.get(`/data/al.json`)
      .then((response) => {
        this.setState({
          loading: false,
          products: response.data.results,
          filteredProducts: response.data.results,
          totalPages: Math.ceil(response.data.results.length / 15),
          value: "al",
          selectedState: [{"value": "al", "label": "Alabama"}],
          shipsSelected: false
        });
      });
    } else {
      this.setState({
        loading: true,
        value: ''
      });
      let dataFetchString = '/data/ships.json';
      axios.get(dataFetchString)
      .then((response) => {
        this.setState({
          loading: false,
          products: response.data.results,
          filteredProducts: response.data.results,
          filter: '',
          cityFilter: '',
          pagination: 0,
          totalPages: Math.ceil(response.data.results.length / 15),
          selectedCity: [{"value": "none", "label": "Select or start typing..."}],
          selectedState: [{"value": 'select', "label": 'Select...'}],
          shipsSelected: true
        });
      });
    }
  }

  ////////////////////////////
  // End load data
  ////////////////////////////

  //-------------------------------//

  ////////////////////////////
  // Handle updates
  ////////////////////////////

  handlePaginationClick = (paginationSelection) => {
    let paginatedList = updatePagination(paginationSelection, this.state.filteredProducts);
    this.setState({
      pagination: paginationSelection.selected,
      filteredProducts: paginatedList
    });
  };

  handleCityChange = (event) => {
    let mobileEvent = document.getElementById('city-select') ? document.getElementById('city-select') : false;
    let eventValue = mobileEvent ? event.target.value : event.value;
    let eventLabel = mobileEvent ? mobileEvent.options[mobileEvent.selectedIndex].text : event.label;
    let filteredList = updateCity(eventValue, eventLabel, this.state.products);
    this.setState({
      filteredProducts: filteredList,
      filter: '',
      cityFilter: eventLabel,
      pagination: 0,
      totalPages: Math.ceil(filteredList.length / 15),
      selectedCity: [{"value": eventValue, "label": eventLabel}]
    });
  }
  
  handleSearch = (event) => {
    this.setState({
      filter: event.target.value
    });
    let filteredSearchList = updateSearch(event, this.state.products, this.state.cityFilter);
    this.setState({
      filteredProducts: filteredSearchList,
      pagination: 0,
      totalPages: Math.ceil(filteredSearchList.length / 15)
    });
  }

  ////////////////////////////
  // End handle updates
  ////////////////////////////

  //-------------------------------//

  ////////////////////////////
  // Render app
  ////////////////////////////

  render() {
    return (
      <div className="container" style={{ marginTop: 50 }}>
        <div className="filter-bar">
          <div className="filter-bar-boxes">
            <h2>Asbestos Exposure By Location</h2>
            <FilterBar 
              updateState={this.updateState} 
              updateCity={this.handleCityChange} 
              selectedCity={this.state.selectedCity}
              searchList={this.handleSearch}
              filter={this.state.filter} 
              rawAppData={this.state.products}
              selectedState={this.state.selectedState}
              stateList={stateList}
              allCityList={this.state.allCityList}
              cityFilter={this.state.cityFilter}
            />
          </div>
          <FilterBarSelect
            updateShips={this.updateShips}
            shipsSelected={this.state.shipsSelected}
          />
          <FilterBarLower />
        </div>
        <ItemList 
          filteredAppData={this.state.filteredProducts}
          searchQuery={this.state.filter}
          listLoading={this.state.loading}
          shipsSelected={this.state.shipsSelected}
        />
        <Pagination 
          updateFullList={this.handlePaginationClick} 
          totalPageCount={this.state.totalPages}
          paginationSelection={this.state.pagination}
          allStatesSelected={this.state.allStatesSelected}
        />
      </div>
    );
  }
}

////////////////////////////
// End render app
////////////////////////////

export default App;
