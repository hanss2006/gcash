import React, {useEffect, useState} from "react";
import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import './App.css';
import TransactionList from "./components/TransactionList";
import Transaction from "./components/Transaction";
import Tree from "./components/Tree";
import Error from "./components/Error";
import Login from "./components/auth/Login";
import Header from "./components/layout/Header";
import {connect} from "react-redux";

function App(props) {
    const {auth} = props;
    return (
        <div className="App">
            <Header></Header>
            <Routes>
                {auth.isLoggedIn && (
                    <>
                        <Route exact path="/" element={<TransactionList/>}/>
                        <Route exact path="tree" element={<Tree/>}/>
                        <Route exact path="transactions" element={<TransactionList/>}/>
                        <Route exact path="transactions/:transactionGuid" element={<Transaction/>}/>
                    </>
                )}
                {!auth.isLoggedIn && (
                    <Route exact path="login" element={<Login/>}/>
                )}
                <Route path="*" element={<Error/>}/>
            </Routes>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.authState,
    };
};

export default connect(mapStateToProps)(App);
