import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
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
                <PrivateRoute exact path="/" element={<TransactionList/>}/>
                <PrivateRoute exact path="tree" element={<Tree/>}/>
                <PrivateRoute exact path="transactions" element={<TransactionList/>}/>
                <PrivateRoute exact path="transactions/:transactionGuid" element={<Transaction/>}/>
                <Route exact path="login" element={<Login/>}/>
                <Route path="*" element={<Error/>}/>
            </Routes>
        </div>
    );
}

function PrivateRoute({ children }) {
    const auth = useAuth();
    return auth ? children : <Navigate to="/login" />;
}

export default App;
