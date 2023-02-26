import React, {useEffect, useState} from "react";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import {Pagination, Search, TableHeader} from "../DataTable";
import {Link, useNavigate} from "react-router-dom";
import "./index.css";
import {selectTransaction} from "../../redux/actions/transaction";
import {useDispatch, useSelector} from "react-redux";
import {
    setFilterSearchString, setFilterMenuLinkTo, setFilterPageSize, setFilterItemsNum,
    setFilterPageNum, setFilterCurrentAccountFullName
} from "../../redux/actions/filterAction";
import {batch} from 'react-redux'
import {axiosPrivate} from "../../helpers/axiosPrivate";

const TransactionList = () => {
    const navigate = useNavigate();
    const {
        filterSearchString, filterPageNum, filterItemsNum, filterSortCol, filterCurrentAccountGuid,
        filterPageSize
    } = useSelector((state) => state.filterState);
    const [transactions, setTransactions] = useState([]);
    const [errorHandler, setErrorHandler] = useState({
        hasError: false,
        message: "",
    });
    const headers = [
        {name: "Comment", field: "description", sortable: false},
        {name: "Date", field: "postDate", sortable: false},
        {name: "Value", field: "value", sortable: false}
    ];
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const dispatch = useDispatch();
    const selectCurrentTransaction = (transaction) => {
        dispatch(selectTransaction({...transaction}));
        //navigate(`/transactions/${transaction.guid}`);
    };

    const loadTransactions = () => {
        showLoader();
        let url = `/transaction/account/${filterCurrentAccountGuid}?page=${filterPageNum}&size=${filterPageSize}`;
        if (filterSearchString !== "") {
            url = `${url}&searchString=${encodeURIComponent(filterSearchString)}`;
        }
        axiosPrivate.get(url)
            .then(res => {
                setTransactions(res.data.content);
                loadTotal(res.data);
            })
            .catch(error => {
                if (error.response) {
                    setErrorHandler({
                        hasError: true,
                        message: error.response.data.message,
                    });
                    console.log("Error: ", errorHandler.message)
                }
            })
            .finally(() => {
                hideLoader();
            });
    };

    const loadTotal = (transactionsData) => {
        axiosPrivate.get(`/transaction/sum/account/${filterCurrentAccountGuid}`)
            .then(res => {
                const title = `Gcash : ${res.data.accountFullName} : ${res.data.accountTotal}`;
                document.title = title;
                batch(() => {
                    dispatch(setFilterPageNum(transactionsData.number));
                    dispatch(setFilterPageSize(transactionsData.size));
                    dispatch(setFilterItemsNum(transactionsData.totalElements));
                    dispatch(setFilterCurrentAccountFullName(title));
                })
            })
            .catch(error => {
                if (error.response) {
                    setErrorHandler({
                        hasError: true,
                        message: error.response.data.message,
                    });
                    console.log("Error: ", errorHandler.message)
                }
            });
    }

    const setPage = (numPage) => {
        dispatch(setFilterPageNum(numPage));
    }

    useEffect(() => {
        dispatch(setFilterMenuLinkTo("tree"));
        loadTransactions();
    }, [filterSearchString, filterPageNum, filterItemsNum, filterSortCol, filterCurrentAccountGuid,
        filterPageSize]);

    const addTransaction = (e) => {
        e.preventDefault();
        selectCurrentTransaction(newTransaction);
        navigate(`/transactions/new`);
    }

    let date = new Date();
    date.setHours(new Date().getHours() + 3);

    const newTransaction = {
        postDate: date.toISOString().slice(0, -8),
        guid: 'new',
        currentAccountGuid: filterCurrentAccountGuid,
        accountGuid: '',
        description: '',
        value: 0
    }
    return (
        <>
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div
                    className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <button type="button" className="btn btn-sm btn-outline-secondary"
                                onClick={addTransaction}
                        >
                            New
                        </button>
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
                <Pagination
                    className="pagination-container"
                    currentPage={filterPageNum + 1}
                    totalCount={filterItemsNum}
                    pageSize={filterPageSize}
                    onPageChange={page => setPage(page - 1)}
                />
            </main>
        </>
    );
};

export default TransactionList;