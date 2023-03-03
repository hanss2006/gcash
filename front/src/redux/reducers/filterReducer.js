import {ActionTypesFilter} from "../actions/filterAction";

const filterCurrentAccountGuid = '063ad681f1bef56cdb8be3695a74f9d6';
const filterState = {
    filterMenuLinkTo: '/',
    filterSearchString: '',
    filterPageNum: 0,
    filterItemsNum: 0,
    filterSortCol: '',
    filterCurrentAccountGuid: filterCurrentAccountGuid,
    filterPageSize: 5,
    filterCurrentAccountFullName: ''
};

const filterReduser = (state= filterState, action) => {
    switch (action.type) {
        case ActionTypesFilter.FILTER_MENU_LINK_TO:
            return {...state, filterMenuLinkTo: action.payload};

        case ActionTypesFilter.FILTER_SEARCH_STRING:
            return {
                ...state,
                filterSearchString: action.payload
            };

        case ActionTypesFilter.FILTER_PAGE_NUM:
            return {
                ...state,
                filterPageNum: action.payload
            };

        case ActionTypesFilter.FILTER_ITEMS_NUM:
            return {
                ...state,
                filterItemsNum: action.payload
            };

        case ActionTypesFilter.FILTER_SORT_COL:
            return {
                ...state,
                filterSortCol: action.payload
            };

        case ActionTypesFilter.FILTER_CURRENT_ACCOUNT_GUID:
            return {
                ...state,
                filterCurrentAccountGuid: action.payload
            };

        case ActionTypesFilter.FILTER_PAGE_SIZE:
            return {
                ...state,
                filterPageSize: action.payload
            };

        case ActionTypesFilter.FILTER_CURRENT_ACCOUNT_FULL_NAME:
            return {
                ...state,
                filterCurrentAccountFullName: action.payload
            };

        default:
            return state;
    }
};

export default filterReduser;
