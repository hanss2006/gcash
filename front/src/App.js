import React from "react";
import {ReactKeycloakProvider} from "@react-keycloak/web";
import keycloak from "./Keycloak";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';
import TransactionList from "./components/TransactionList";
import Transaction from "./components/Transaction";
import Error from "./components/Error";
import Header from "./components/Header";
import TreePage from "./components/TreePage";
import PrivateRoute from "./helpers/PrivateRoute";
import axios from "axios";
import {useEffect} from 'react';

function App() {
    useEffect(() => {
        axios.interceptors.request.use(
            (config) => {
                axios.defaults.baseURL = "/api/gcash";
                axios.defaults.headers.common.Realm = keycloak.realm;
                config.headers.Authorization = `Bearer ${keycloak.token}`;
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }, []);
    return (
        <div className="App">
            <ReactKeycloakProvider authClient={keycloak}>
                <BrowserRouter basename="/gcash">
                    <Header></Header>
                    <Routes>
                        {/*
                {auth.isLoggedIn && (
*/}
                        <>
                            <Route exact path="/" element={<PrivateRoute><TransactionList/></PrivateRoute>}/>
                            <Route exact path="tree" element={<PrivateRoute><TreePage/></PrivateRoute>}/>
                            <Route exact path="transactions/account/:accountGuid" element={<PrivateRoute><TransactionList/></PrivateRoute>}/>
                            <Route exact path="transactions/:transactionGuid" element={<PrivateRoute><Transaction/></PrivateRoute>}/>
                        </>
                        {/*
                )}
*/}
                        <Route path="*" element={<Error/>}/>
                    </Routes>
                </BrowserRouter>
            </ReactKeycloakProvider>
        </div>
    );
}

export default App;
