import './App.css';
import {KeycloackContext} from "./KeycloakContext";
import React, {useContext} from "react";
import {Route, Routes} from "react-router-dom";
import TransactionList from "./components/TransactionList";
import TreePage from "./components/TreePage";
import Transaction from "./components/Transaction";
import Error from "./components/Error";
import Header from "./components/Header";

function App() {
    const {keycloackValue, authenticated} = useContext(KeycloackContext);
    return (
        (keycloackValue && authenticated) ?
            <React.Fragment>
                <div className="container">
                    <Header/>
                    <div className="container-fluid">
                        <div className="row">
                            <TreePage/>
                            <Routes>
                                {
                                    <React.Fragment>
                                        <Route exact path="/" element={<TransactionList/>}/>
                                        <Route exact path="transactions/account/:accountGuid" element={<TransactionList/>}/>
                                        <Route exact path="transactions/:transactionGuid" element={<Transaction/>}/>
                                    </React.Fragment>
                                }
                                <Route path="*" element={<Error/>}/>
                            </Routes>
                        </div>
                    </div>
                </div>
            </React.Fragment>
            : <></>
    );
}

export default App;
