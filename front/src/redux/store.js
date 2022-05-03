import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import authreducer from "./reducers/AuthReducer";
import thunk from "redux-thunk";
import authErrorReducer from "./reducers/AuthErrorReducer";
import transactionsReducer from "./reducers/TransactionReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
        authState: authreducer,
        authError: authErrorReducer,
        transactionsState: transactionsReducer
    }
);

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
