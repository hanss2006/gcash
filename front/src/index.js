import 'bootstrap/dist/css/bootstrap.css'
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {KeycloackContextProvider} from "./KeycloakContext";
import {Provider} from "react-redux";
import store from "./redux/store";
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <KeycloackContextProvider>
        <Provider store={store}>
            <BrowserRouter basename="/gcash">
                <App/>
            </BrowserRouter>
        </Provider>
    </KeycloackContextProvider>
);

