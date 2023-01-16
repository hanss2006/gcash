import {KeycloackContext} from "./KeycloakContext";
import React, {useContext} from "react";
import {Route, Routes} from "react-router-dom";
import TransactionList from "./components/TransactionList";
import TreePage from "./components/TreePage";
import Transaction from "./components/Transaction";
import Error from "./components/Error";
import Header from "./components/Header";

function App() {
  const { keycloackValue, authenticated } = useContext(KeycloackContext)
  return (
      <div className="App">
{/*
          <Header></Header>
*/}
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
                      : <></>
              }
              <Route path="*" element={<Error/>}/>
          </Routes>
      </div>
  );
}

export default App;
