export const actionTypes = {
    CREATE_TRANSACTION: "Transaction/create",
    UPDATE_TRANSACTION: "Transaction/update",
    DELETE_TRANSACTION: "Transaction/delete"
};

export function createTransaction(transaction) {
    return dispatch => {
        return dispatch({ type: actionTypes.CREATE_TRANSACTION, transaction });
    };
}

export function updateTransaction(transaction, index) {
    return dispatch => {
        return dispatch({ type: actionTypes.UPDATE_TRANSACTION, transaction, index });
    };
}

export function deleteTransaction(index) {
    return dispatch => {
        return dispatch({ type: actionTypes.DELETE_TRANSACTION, index });
    };
}