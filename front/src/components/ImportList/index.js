import React, {useState} from "react";
import "./index.css";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectTransaction} from "../../redux/actions/transaction";

function ImportList(props) {
    const [file, setFile] = useState();
    const [transactions, setTransactions] = useState([]);
    const {currentTransaction} = useSelector((state) => state.transactionState);
    const dispatch = useDispatch();

    const fileReader = new FileReader();

    const handleOnChange = (e) => {
        setFile(e.target.files[0]);
    };
    const csvFileToArray = string => {
        const decoded = string;

        const csvHeader = decoded.slice(0, decoded.indexOf("\n")).split(";");
        const csvRows = decoded.slice(decoded.indexOf("\n") + 1).split("\n");

        const array = csvRows.map(i => {
            const values = i.split(";");
            const obj = csvHeader.reduce((object, header, index) => {
                object[header] = values[index];
                return object;
            }, {});
            return obj;
        });

        let transactions = new Array();
        array.forEach(function(item){
            if (item['"Статус"']==='"OK"'){
                transactions.push(
                    {
                        postDate: item['"Дата операции"'].replace(/["]/g,''),
                        guid: 'new',
                        currentAccountGuid: filterCurrentAccountGuid,
                        accountGuid: '',
                        description: item['"Описание"'].replace(/["]/g,''),
                        value: item['"Сумма операции"'].replace(/["]/g,'')
                    }
                );
            }
        })
        setTransactions(transactions);
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (file) {
            fileReader.onload = function (event) {
                const text = event.target.result;
                csvFileToArray(text);
            };
            fileReader.readAsText(file, 'windows-1251')
        }
    };

    //const headerKeys = Object.keys(Object.assign({}, ...array));
    const navigate = useNavigate();
    const {filterCurrentAccountGuid} = useSelector((state) => state.filterState);
    const cancelAPIData = (e) => {
        e.preventDefault();
        navigate(`../transactions/account/${filterCurrentAccountGuid}`);
    }
    const selectCurrentTransaction = (transaction) => {
        dispatch(selectTransaction({...transaction}));
        //navigate(`/transactions/${transaction.guid}`);
    };

/*
    {array.map((item) => (
        <tr key={item.id}>
            {Object.values(item).map((val) => (
                <td>{val}</td>
            ))}
        </tr>
    ))}
*/


    return (
        <>
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div
                    className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <form>
                            <input className="form-control"
                                type={"file"}
                                id={"csvFileInput"}
                                accept={".csv"}
                                onChange={handleOnChange}
                            />

                            <button  type="button" className="btn btn-outline-secondary"
                                onClick={(e) => {
                                    handleOnSubmit(e);
                                }}
                            >
                                Import
                            </button>
                            <button type='reset' onClick={cancelAPIData} className="btn btn-outline-secondary">
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table table-striped table-sm">
                        <thead>
                        <tr>
                            <th scope="col">Comment</th>
                            <th scope="col">Date</th>
                            <th scope="col">Value</th>
                        </tr>
                        </thead>
                        <tbody>
                        {transactions.map(transaction => (
                            <tr key={transaction.guid}>
                                <td>
                                    <Link to={`/transactions/${transaction.guid}`}
                                          onClick={() => selectCurrentTransaction(transaction)}>
                                        {transaction.description}
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/transactions/${transaction.guid}`}
                                          onClick={() => selectCurrentTransaction(transaction)}>
                                        {new Date(transaction.postDate)
                                            .toLocaleTimeString('ru-Ru',
                                                {
                                                    year: 'numeric',
                                                    month: 'numeric',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                }
                                            )
                                        }
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/transactions/${transaction.guid}`}
                                          onClick={() => selectCurrentTransaction(transaction)}>
                                        {transaction.value}
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    );
}

export default ImportList;