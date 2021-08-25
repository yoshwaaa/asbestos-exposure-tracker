export function handleOutsideStateSelect (stateList, outsideStateSelect) {
  for (var i=0; i < stateList.length; i++) {
    if (stateList[i].value === outsideStateSelect) {
        var selectedValue = stateList[i].label
        return selectedValue;     
    }
  }
}