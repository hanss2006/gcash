import {actionTypes} from "../actions/transaction";

const initialState = {
    currentTransaction: {
        postDate: null,
        guid: "",
        currentAccountGuid: "",
        accountGuid: "",
        description: "",
        value: 0
    }
};

export default function transactionreducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SELECT_TRANSACTION:
            return {
                ...state,
                currentTransaction: { ...action.currentTransaction }
            };

        default:
            return { ...state };
    }
}