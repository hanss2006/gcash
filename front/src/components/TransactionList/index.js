import React, {useEffect, useMemo, useState} from "react";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import {Pagination, Search, TableHeader} from "../DataTable";
import axios from "axios";
import {Link} from "react-router-dom";
import "./index.css";
import {selectTransaction} from "../../redux/actions/transaction";
import {useDispatch, useSelector} from "react-redux";
import {filterSearchString as setFilterSearchString, filterMenuLinkTo as  setFilterMenuLinkTo,
    filterPageSize as setFilterPageSize, filterItemsNum as setFilterItemsNum,
    filterPageNum as setFilterPageNum} from "../../redux/actions/filterAction";
import { batch } from 'react-redux'

const TransactionList = () => {
    const  { filterSearchString , filterPageNum,filterItemsNum, filterSortCol, filterCurrentAccountGuid,
        filterPageSize } = useSelector((state) => state.filterState);
    const [transactions, setTransactions] = useState([]);
    const [errorHandler, setErrorHandler] = useState({
        hasError: false,
        message: "",
    });
    const [loader] = useFullPageLoader();

    const headers = [
        {name: "Comment", field: "description", sortable: false},
        {name: "Date", field: "postDate", sortable: false},
        {name: "Value", field: "value", sortable: false}
    ];
    const url = `/transaction/account/${filterCurrentAccountGuid}?page=${filterPageNum}&size=${filterPageSize}`;
    const dispatch = useDispatch();
    const selectCurrentTransaction = (transaction) => {
        dispatch(selectTransaction({ ...transaction }));
        //navigate(`/transactions/${transaction.guid}`);
    };
    useEffect(() => {
        dispatch(setFilterMenuLinkTo("tree"));
        //showLoader();
        axios.get(url)
            .then(res => {
                setTransactions(res.data.content);
                batch(() => {
                    dispatch(setFilterPageNum(res.data.number));
                    dispatch(setFilterPageSize(res.data.size));
                    dispatch(setFilterItemsNum(res.data.totalElements));
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
            })
            .finally(() => {
                //hideLoader();
            });
    }, []);

/*
    const transactionsData = useMemo(() => {
        let computedTransactions = (transactions != null) ? transactions : [];

        if (search) {
            computedTransactions = computedTransactions.filter(
                transaction =>
                    transaction.description.toLowerCase().includes(search.toLowerCase())
                // || transaction.value.toLowerCase().includes(search.toLowerCase())
            );
        }

        //setTotalItems(computedTransactions.length);

        //Sorting comments
        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            computedTransactions = computedTransactions.sort(
                (a, b) =>
                    reversed * a[sorting.field].localeCompare(b[sorting.field])
            );
        }

        //Current Page slice
        return computedTransactions.slice(
            (currentPage - 1) * pageSize,
            (currentPage - 1) * pageSize + pageSize
        );
    }, [transactions, currentPage, search, sorting]);
*/


    return (
        <>
            <div className="row w-100">
                <div className="col mb-3 col-12 text-center">
                    <div className="row">
                        <div className="col-md-6">
                            <Pagination
                                total={filterItemsNum}
                                itemsPerPage={filterPageSize}
                                currentPage={filterPageNum}
                                onPageChange={page => dispatch(setFilterPageNum(page))}
                            />
                        </div>
                        <div className="col-md-6 d-flex flex-row-reverse">
                            <Search
                                onSearch={value => {
                                    dispatch(setFilterSearchString(value));
                                    dispatch(setFilterPageNum(1));
                                }}
                            />
                        </div>
                    </div>

                    <table className="table table-striped">
                        <TableHeader
                            headers={headers}
                            onSorting={(field, order) => dispatch(filterSortCol(field)) }
                        />
                        <tbody>
                        {transactions.map(transaction => (
                            <tr key={transaction.guid}>
                                <th scope="row">
                                    <Link to={`/transactions/${transaction.guid}`}
                                          onClick={() => selectCurrentTransaction(transaction)}>
                                        {transaction.description}
                                    </Link>
                                </th>
                                <td>
                                    <Link to={`/transactions/${transaction.guid}`}
                                          onClick={() => selectCurrentTransaction(transaction)}>
                                        {new Date(transaction.postDate)
                                            .toLocaleTimeString('ru-Ru',
                                                {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'}
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
            </div>
            {loader}
        </>
    );
};

export default TransactionList;

