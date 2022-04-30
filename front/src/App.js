import React from "react";
import {Route, Routes} from "react-router-dom";
import './App.css';
import TransactionList from "./components/TransactionList";
import Transaction from "./components/Transaction";
import Tree from "./components/Tree";
import Error from "./components/Error";
import Login from "./components/auth/Login";
import Header from "./components/layout/Header";

function App() {
    return (
        <div className="App">
            <Header></Header>
            <Routes>
                <Route exact path="/" element={<TransactionList/>}/>
                <Route exact path="tree" element={<Tree/>}/>
                <Route exact path="transactions" element={<TransactionList/>}/>
                <Route exact path="transactions/:transactionGuid" element={<Transaction/>}/>
                <Route exact path="login" element={<Login/>}/>
                <Route path="*" element={<Error/>}/>
            </Routes>
        </div>
    );
}

export default App;
