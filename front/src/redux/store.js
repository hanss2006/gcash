import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import authreducer from "./reducers/AuthReducer";
import thunk from "redux-thunk";
import authErrorReducer from "./reducers/AuthErrorReducer";
import transactionreducer from "./reducers/transaction";
import filterReducer from "./reducers/filterReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
        authState: authreducer,
        authError: authErrorReducer,
        transactionState: transactionreducer,
        filterState: filterReducer
    }
);

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);

export default store;
