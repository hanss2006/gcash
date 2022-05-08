export const actionTypes = {
    SELECT_TRANSACTION: "Transaction/select"
};

export function selectTransaction(currentTransaction) {
    return dispatch => {
        return dispatch({ type: actionTypes.SELECT_TRANSACTION, currentTransaction });
    };
}