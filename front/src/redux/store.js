import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import transactionreducer from "./reducers/transaction";
import filterReducer from "./reducers/filterReducer";
import importsreducer from "./reducers/imports";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
        transactionState: transactionreducer,
        filterState: filterReducer,
        importsState: importsreducer
    }
);

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);

export default store;
