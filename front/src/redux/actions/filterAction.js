export const ActionTypesFilter = {
    FILTER_MENU_LINK_TO: "Filter/MenuLinkTo",
    FILTER_SEARCH_STRING: "Filter/SearchString",
    FILTER_PAGE_NUM: "Filter/PageNum",
    FILTER_ITEMS_NUM: "Filter/ItemsNum",
    FILTER_SORT_COL: "Filter/SortCol",
    FILTER_CURRENT_ACCOUNT_GUID: "Filter/CurrentAccountGuid",
    FILTER_PAGE_SIZE: "Filter/FilterPageSize",
};

const filterMenuLinkTo = (menuLinkTo) => {
    return {
        type: ActionTypesFilter.FILTER_MENU_LINK_TO,
        payload: menuLinkTo
    }
}

const filterSearchString = (searchString) => {
    return {
        type: ActionTypesFilter.FILTER_SEARCH_STRING,
        payload: searchString
    }
}

const filterPageNum = (pageNum) => {
    return {
        type: ActionTypesFilter.FILTER_PAGE_NUM,
        payload: pageNum
    }
}

const filterItemsNum = (itemsNum) => {
    return {
        type: ActionTypesFilter.FILTER_ITEMS_NUM,
        payload: itemsNum
    }
}
const filterSortCol = (sortCol) => {
    return {
        type: ActionTypesFilter.FILTER_SORT_COL,
        payload: sortCol
    }
}

const filterCurrentAccountGuid = (currentAccountGuid) => {
    return {
        type: ActionTypesFilter.FILTER_CURRENT_ACCOUNT_GUID,
        payload: currentAccountGuid
    };
}

const filterPageSize = (pageSize) => {
    return {
        type: ActionTypesFilter.FILTER_PAGE_SIZE,
        payload: pageSize
    };
}

export {
    filterMenuLinkTo,
    filterSearchString,
    filterPageNum,
    filterItemsNum,
    filterSortCol,
    filterCurrentAccountGuid,
    filterPageSize
};
