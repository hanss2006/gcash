import React, {useContext} from "react";
import {Route, Routes} from "react-router-dom";
import './App.css';
import TransactionList from "./components/TransactionList";
import Transaction from "./components/Transaction";
import Error from "./components/Error";
import Login from "./components/auth/Login";
import Header from "./components/Header";
import {connect} from "react-redux";
import TreePage from "./components/TreePage";
import { KeycloackContext } from './KeycloakContext'

function App(props) {
    //const {auth} = props;
    const { keycloackValue, authenticated } = useContext(KeycloackContext);

    return (
        <div className="App">
            <Header></Header>
            <Routes>
                {
                    //auth?.isLoggedIn
                    (keycloackValue && authenticated)
                        ? <>
                        <Route exact path="/" element={<TransactionList/>}/>
                        <Route exact path="tree" element={<TreePage/>}/>
                        <Route exact path="transactions/account/:accountGuid" element={<TransactionList/>}/>
                        <Route exact path="transactions/:transactionGuid" element={<Transaction/>}/>
                      </>
                    : <Route exact path="login" element={<Login/>}/>
                }
                <Route path="*" element={<Error/>}/>
            </Routes>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.authState
    };
};

export default connect(mapStateToProps)(App);
