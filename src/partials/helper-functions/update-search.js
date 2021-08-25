export function updateSearch (event, productsList, cityFilter) {
    let arrayLength = productsList.length;
    let filteredSearchList = [];
    if (event.target.value && (cityFilter === '' || cityFilter === 'All')) {
      for (let i = 0; i < arrayLength; i++) {
        if (productsList[i].company.replace(",", "").replace(" ", "").replace(/[\u00E0-\u00F0]/ig,'').toLowerCase().indexOf(event.target.value.replace(",", "").replace(" ", "").replace(/[\u00E0-\u00F0]/ig,'').toLowerCase()) !== -1 || productsList[i].city.replace(",", "").replace(" ", "").replace(/[\u00E0-\u00F0]/ig,'').toLowerCase().indexOf(event.target.value.replace(",", "").replace(" ", "").replace(/[\u00E0-\u00F0]/ig,'').toLowerCase()) !== -1) {
          filteredSearchList.push(productsList[i]);
        }  
      }
    } else if (event.target.value && (cityFilter !== '' || cityFilter !== 'All')) {
      for (let n = 0; n < arrayLength; n++) {
        if (
            (productsList[n].company.replace(",", "").replace(" ", "").replace(/[\u00E0-\u00F0]/ig,'').toLowerCase().indexOf(event.target.value.replace(",", "").replace(" ", "").replace(/[\u00E0-\u00F0]/ig,'').toLowerCase()) !== -1 && productsList[n].city.replace(",", "").replace(" ", "").replace(/[\u00E0-\u00F0]/ig,'').toLowerCase().indexOf(cityFilter.replace(",", "").replace(" ", "").replace(/[\u00E0-\u00F0]/ig,'').toLowerCase()) !== -1) 
            || (productsList[n].city.replace(",", "").replace(" ", "").replace(/[\u00E0-\u00F0]/ig,'').toLowerCase().indexOf(event.target.value.replace(",", "").replace(" ", "").replace(/[\u00E0-\u00F0]/ig,'').toLowerCase()) !== -1 && productsList[n].city.replace(",", "").replace(" ", "").replace(/[\u00E0-\u00F0]/ig,'').toLowerCase().indexOf(cityFilter.replace(",", "").replace(" ", "").replace(/[\u00E0-\u00F0]/ig,'').toLowerCase()) !== -1)) {
          filteredSearchList.push(productsList[n]);
        }  
      }
    } else if (!event.target.value && cityFilter !== '' && cityFilter !== 'All') { 
      for (let m = 0; m < arrayLength; m++) {
        if (productsList[m].city.replace(",", "").replace(" ", "").replace(/[\u00E0-\u00F0]/ig,'').toLowerCase() === cityFilter.replace(",", "").replace(" ", "").replace(/[\u00E0-\u00F0]/ig,'').toLowerCase()) {
          filteredSearchList.push(productsList[m]);
        }
      }
    } else {   
      filteredSearchList = productsList;
    }
    let filteredArrayLength = filteredSearchList.length;
    let paginationNum = 1;
    let offsetEnd = Math.ceil(paginationNum * 15);
    let offsetStart = Math.ceil(offsetEnd - 14);
    for (let o = 0; o < filteredArrayLength; o++) {
      if (o >= offsetStart - 1 && o <= offsetEnd - 1) {
        filteredSearchList[o].visibility = "visible";
      } else {
        filteredSearchList[o].visibility = "";
      }
    }
    return filteredSearchList;
};