export const ActionTypesFilter = {
    FILTER_MENU_LINK_TO: "Filter/MenuLinkTo",
    FILTER_SEARCH_STRING: "Filter/SearchString",
    FILTER_PAGE_NUM: "Filter/PageNum",
    FILTER_ITEMS_NUM: "Filter/ItemsNum",
    FILTER_SORT_COL: "Filter/SortCol",
    FILTER_CURRENT_ACCOUNT_GUID: "Filter/CurrentAccountGuid",
    FILTER_PAGE_SIZE: "Filter/FilterPageSize",
    FILTER_CURRENT_ACCOUNT_FULL_NAME: "Filter/CurrentAccountFullName",
};

const setFilterMenuLinkTo = (menuLinkTo) => {
    return {
        type: ActionTypesFilter.FILTER_MENU_LINK_TO,
        payload: menuLinkTo
    }
}

const setFilterSearchString = (searchString) => {
    return {
        type: ActionTypesFilter.FILTER_SEARCH_STRING,
        payload: searchString
    }
}

const setFilterPageNum = (pageNum) => {
    return {
        type: ActionTypesFilter.FILTER_PAGE_NUM,
        payload: pageNum
    }
}

const setFilterItemsNum = (itemsNum) => {
    return {
        type: ActionTypesFilter.FILTER_ITEMS_NUM,
        payload: itemsNum
    }
}
const setFilterSortCol = (sortCol) => {
    return {
        type: ActionTypesFilter.FILTER_SORT_COL,
        payload: sortCol
    }
}

const setFilterCurrentAccountGuid = (currentAccountGuid) => {
    return {
        type: ActionTypesFilter.FILTER_CURRENT_ACCOUNT_GUID,
        payload: currentAccountGuid
    };
}

const setFilterPageSize = (pageSize) => {
    return {
        type: ActionTypesFilter.FILTER_PAGE_SIZE,
        payload: pageSize
    };
}

const setFilterCurrentAccountFullName = (currentAccountFullName) => {
    return {
        type: ActionTypesFilter.FILTER_CURRENT_ACCOUNT_FULL_NAME,
        payload: currentAccountFullName
    };
}

export {
    setFilterMenuLinkTo,
    setFilterSearchString,
    setFilterPageNum,
    setFilterItemsNum,
    setFilterSortCol,
    setFilterCurrentAccountGuid,
    setFilterPageSize,
    setFilterCurrentAccountFullName,
};
