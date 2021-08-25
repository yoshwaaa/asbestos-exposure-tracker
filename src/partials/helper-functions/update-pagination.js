export function updatePagination (paginationSelection, filteredProducts) {
    let arrayLength = filteredProducts.length;
    let paginationNum = paginationSelection.selected + 1;
    let offsetEnd = Math.ceil(paginationNum * 15);
    let offsetStart = Math.ceil(offsetEnd - 14);
    let paginatedList = filteredProducts;
    for (let i = 0; i < arrayLength; i++) {
      if (i >= offsetStart - 1 && i <= offsetEnd - 1) {
        paginatedList[i].visibility = "visible";
      } else {
        paginatedList[i].visibility = "";
      }
    }
    return paginatedList;
};