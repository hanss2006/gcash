import React, { Component } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import TransactionList from "./components/TransactionList";
import Transaction from "./components/Transaction";
import Tree from "./components/Tree";
import Error from "./components/Error";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Tree />} />
        <Route path="tansactions" element={<TransactionList />} />
        <Route path="tansaction" element={<Transaction />} />
        <Route path="*" element={<Error/>} />
      </Routes>
    </div>
  );
}

export default App;
