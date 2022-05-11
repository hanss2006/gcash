import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import {connect, useDispatch, useSelector} from "react-redux";
import "./index.css";
import {setFilterMenuLinkTo} from "../../redux/actions/filterAction";

const Transaction = () => {
    //const {transactionGuid} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {filterCurrentAccountGuid} = useSelector((state) => state.filterState);
    const {currentTransaction} = useSelector((state) => state.transactionState);
    const [inputs, setInputs] = useState(currentTransaction);
    const [accounts, setAccounts] = useState([]);
    const updateFormValue = (formValues) => {
        setInputs((inputObj) => ({...inputObj, [formValues.target.name]: formValues.target.value}));
    }

    useEffect(() => {
        dispatch(setFilterMenuLinkTo(`/transactions/account/${filterCurrentAccountGuid}`));
        loadAccounts();
    }, []);

    const updateAPIData = (e) => {
        e.preventDefault();
        if (inputs.guid === 'new') {
            axios.post(`/transaction/`, inputs).then(() => {
                navigate(`../transactions/account/${inputs.currentAccountGuid}`);
            })
        } else {
            axios.put(`/transaction/`, inputs).then(() => {
                navigate(`../transactions/account/${inputs.currentAccountGuid}`);
            })
        }
    }
    const deleteAPIData = (e) => {
        e.preventDefault();
        if (inputs.guid === 'new') {
            navigate(`../transactions/account/${inputs.currentAccountGuid}`);
        } else {
            axios.delete(`/transaction/${currentTransaction.guid}`).then(() => {
                navigate(`../transactions/account/${inputs.currentAccountGuid}`);
            })
        }
    }
    const cancelAPIData = (e) => {
        e.preventDefault();
        navigate(`../transactions/account/${inputs.currentAccountGuid}`);
    }

    const loadAccounts = () => {
        //showLoader();
        axios.get(`/account/`)
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
                    value={inputs.currentAccountGuid}
                    onChange={(e) => updateFormValue(e)}
                />
                <div className="form-outline mb-4">
                    <select
                        id='accountGuid'
                        name='accountGuid'
                        className='form-control'
                        value={inputs.accountGuid}
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
                        value={inputs.postDate}
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
                        value={inputs.description}
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
                        value={inputs.value}
                        onChange={(e) => updateFormValue(e)}
                    />
                    <label className='form-label' htmlFor='value'>value</label>
                </div>

                <button type='submit' onClick={updateAPIData} className="btn btn-primary btn-block mb-4">Save</button>
                <button type='button' onClick={deleteAPIData} className="btn btn-danger btn-block mb-4">Delete</button>
                <button type='reset' onClick={cancelAPIData} className="btn btn-secondary btn-block mb-4">Cancel
                </button>
            </form>
        </div>
    )
}

export default Transaction;
