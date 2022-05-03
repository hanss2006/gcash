import { GetTransactionsActionType } from "../actions/TransactionsAction";

const initialState = {
        "loading": false,
        "transactions":  {
            "content": [],
            "pageable": {
                "sort": {
                    "sorted": false,
                    "unsorted": true,
                    "empty": true
                },
                "pageNumber": 0,
                "pageSize": 20,
                "offset": 0,
                "paged": true,
                "unpaged": false
            },
            "last": false,
            "totalElements": 0,
            "totalPages": 0,
            "first": true,
            "numberOfElements": 20,
            "sort": {
                "sorted": false,
                "unsorted": true,
                "empty": true
            },
            "size": 0,
            "number": 0,
            "empty": true
        },
        error: null
    };

export default function transactionsReducer(state = initialState , action) {
    switch (action.type) {
        case GetTransactionsActionType.GET_TRANSACTIONS_STARTED:
            return {
                ...state,
                loading: true
            };
        case GetTransactionsActionType.GET_TRANSACTIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                "transactions": action.payload
            };
        case GetTransactionsActionType.GET_TRANSACTIONS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
}
