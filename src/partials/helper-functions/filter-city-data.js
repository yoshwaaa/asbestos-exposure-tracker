export function filteredCityData (appData) {
    let arrayLength = appData.length;
    let cityData = [];
    cityData.push("");
    for (var i = 0; i < arrayLength; i++) {
        cityData.push(appData[i].city);
    }
    let x = (cityData) => cityData.filter((v,i) => cityData.indexOf(v) === i);
    cityData = x(cityData);
    return cityData;
}