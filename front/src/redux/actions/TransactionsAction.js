import axios from "axios";

const GetTransactionsActionType = {
    GET_TRANSACTIONS_STARTED: "GET_TRANSACTIONS_STARTED",
    GET_TRANSACTIONS_SUCCESS: "GET_TRANSACTIONS_SUCCESS",
    GET_TRANSACTIONS_FAIL: "GET_TRANSACTIONS_FAIL",
};

const getTransactionsAction = (accoutGuid, setErrorHandler) => {
    return async (dispatch) => {
        try {
            const res = await axios.get("/transaction/account/"+accoutGuid);
            const { data } = res;
            dispatch({ type: GetTransactionsActionType.GET_TRANSACTIONS_SUCCESS, payload: data });
        } catch (error) {
            if (error.response) {
                dispatch({
                    type: GetTransactionsActionType.GET_TRANSACTIONS_FAIL,
                    payload: error.response.data.message,
                });
                setErrorHandler({
                    hasError: true,
                    message: error.response.data.message,
                });
            }
        }
    };
};

export {
    getTransactionsAction,
    GetTransactionsActionType,
};
