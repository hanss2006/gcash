import {actionTypes} from "../actions/transactions";

const initialState = {
    list: [{
        transactionGuid: "",
        currentAccountGuid: "",
        accountGuid: "",
        postDate: "",
        description: "",
        value: 0
    }]
}

export default function transactions(state = initialState, action) {
    switch (action.type) {
        case actionTypes.CREATE_TRANSACTION:
            return {
                ...state,
                list: [...state.list, { ...action.transaction }]
            };

        case actionTypes.UPDATE_TRANSACTION
            return {
                ...state,
                list: state.list.map((transaction, index) =>
                    index === action.index ? { ...action.transaction } : transaction
                )
            };

        case actionTypes.DELETE_TRANSACTION:
            return {
                ...state,
                list: state.list.filter(
                    (transaction, index) => index !== action.index
                )
            };

        default:
            return { ...state };
    }
}
