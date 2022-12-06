import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import "./index.css";
import {setFilterMenuLinkTo} from "../../redux/actions/filterAction";
import {selectTransaction} from "../../redux/actions/transaction";
import {axiosPrivate} from "../../helpers/axiosPrivate";

const Transaction = () => {
    //const {transactionGuid} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {filterCurrentAccountGuid} = useSelector((state) => state.filterState);
    const {currentTransaction} = useSelector((state) => state.transactionState);
    //const [inputs, setInputs] = useState(currentTransaction);
    const [accounts, setAccounts] = useState([]);
    const updateFormValue = (formValues) => {
        //setInputs((inputObj) => ({...inputObj, [formValues.target.name]: formValues.target.value}));
        dispatch(selectTransaction({
            ...currentTransaction,
            [formValues.target.name]: formValues.target.value
        }))
    }

    useEffect(() => {
        dispatch(setFilterMenuLinkTo(`/transactions/account/${filterCurrentAccountGuid}`));
        loadAccounts();
    }, []);

    const updateAPIData = (e) => {
        e.preventDefault();
        if (currentTransaction.guid === 'new') {
            axiosPrivate.post(`/transaction/`, currentTransaction).then(() => {
                navigate(`../transactions/account/${currentTransaction.currentAccountGuid}`);
            })
        } else {
            axiosPrivate.put(`/transaction/`, currentTransaction).then(() => {
                navigate(`../transactions/account/${currentTransaction.currentAccountGuid}`);
            })
        }
    }

    const duplicateAPIData = (e) => {
        if (currentTransaction.guid !== 'new') {
            if (window.confirm("Are you sure you want to duplicate?")) {
                let date = new Date();
                date.setHours(new Date().getHours()+3);
                const newTransaction = {
                    postDate: date.toISOString().slice(0, -8),
                    guid: 'new',
                    currentAccountGuid: currentTransaction.currentAccountGuid,
                    accountGuid: currentTransaction.accountGuid,
                    description: currentTransaction.description,
                    value: currentTransaction.value
                }

                dispatch(selectTransaction({...newTransaction}));
                navigate(`../transactions/new`);
            }
        }
    }

    const deleteAPIData = (e) => {
        if (window.confirm("Are you sure you want to delete?")) {
            e.preventDefault();
            if (currentTransaction.guid === 'new') {
                navigate(`../transactions/account/${currentTransaction.currentAccountGuid}`);
            } else {
                axiosPrivate.delete(`/transaction/${currentTransaction.guid}`).then(() => {
                    navigate(`../transactions/account/${currentTransaction.currentAccountGuid}`);
                })
            }
        }
    }
    const cancelAPIData = (e) => {
        e.preventDefault();
        navigate(`../transactions/account/${currentTransaction.currentAccountGuid}`);
    }

    const loadAccounts = () => {
        //showLoader();
        axiosPrivate.get(`/account/`)
            .then(res => {
                setAccounts(res.data.content);
            })
            .catch(error => {
                if (error.response) {
                    console.log("Error: ", error.response.message)
                }
            })
            .finally(() => {
                //hideLoader();
            });
    };

    return (
        <div>
            <form onSubmit={updateAPIData}>
                <input
                    type='hidden'
                    id='currentAccountGuid'
                    name='currentAccountGuid'
                    className='form-control'
                    value={currentTransaction.currentAccountGuid}
                    onChange={(e) => updateFormValue(e)}
                />
                <div className="form-outline mb-4">
                    <select
                        id='accountGuid'
                        name='accountGuid'
                        className='form-control'
                        value={currentTransaction.accountGuid}
                        onChange={(e) => updateFormValue(e)}
                    >
                        {accounts.map((account) => (
                            <option key={account.guid} value={account.guid}>
                                {account.name}
                            </option>
                        ))}
                    </select>
                    <label className='form-label' htmlFor='accountGuid'>accountGuid</label>
                </div>
                <div className="form-outline mb-4">
                    <input
                        type='datetime-local'
                        id='postDate'
                        name='postDate'
                        className='form-control'
                        value={currentTransaction.postDate}
                        onChange={(e) => updateFormValue(e)}
                    />
                    <label className='form-label' htmlFor='postDate'>postDate</label>
                </div>
                <div className="form-outline mb-4">
                    <input
                        type='text'
                        id='description'
                        name='description'
                        className='form-control'
                        value={currentTransaction.description}
                        onChange={(e) => updateFormValue(e)}
                    />
                    <label className='form-label' htmlFor='description'>description</label>
                </div>
                <div className="form-outline mb-4">
                    <input
                        type='number'
                        step='0.01'
                        id='value'
                        name='value'
                        className='form-control'
                        value={currentTransaction.value}
                        onChange={(e) => updateFormValue(e)}
                    />
                    <label className='form-label' htmlFor='value'>value</label>
                </div>
                <button type='submit' onClick={updateAPIData} className="btn btn-outline-primary">Save</button>
                <button type='button' onClick={deleteAPIData} className="btn btn-outline-danger">Delete</button>
                <button type='button' onClick={duplicateAPIData} className="btn btn-outline-info">Double</button>
                <button type='reset' onClick={cancelAPIData} className="btn btn-outline-secondary">Cancel</button>
            </form>
        </div>
    )
}

export default Transaction;
