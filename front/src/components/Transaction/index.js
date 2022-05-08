import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from 'react-router-dom';
import {Button, Form} from "react-bootstrap";
import axios from "axios";
import {connect} from "react-redux";

const Transaction = ({currentTransaction}) => {
    const { transactionGuid } = useParams();
    const navigate = useNavigate();
    const [inputs, setInputs] = useState(currentTransaction);
    const updateFormValue = (formValues) =>{
        setInputs((inputObj) => ({ ...inputObj, [ formValues.target.placeholder]:  formValues.target.value }));
    }


    /*
    const [currentAccountGuid, setCurrentAccountGuid] = useState('');
    const [accountGuid, setAccountGuid] = useState('');
    const [postDate, setPostDate] = useState('');
    const [description, setDescription] = useState(false);
    const [value, setValue] = useState(false);
    */

    let url = `/transaction/`;

    const updateAPIData = (e) => {
        e.preventDefault();
        axios.put(url, inputs).then(() => {
            navigate(`/transaction/account/${inputs.currentAccountGuid}`);
        })
    }
    return (
        <div>
            <form onSubmit={updateAPIData} className="transaction-form">
                    <label>currentAccountGuid</label>
                    <input placeholder='currentAccountGuid' value={inputs.currentAccountGuid}
                           onChange={(e) => updateFormValue(e)}/>

                    <label>accountGuid</label>
                    <input placeholder='accountGuid' value={inputs.accountGuid}
                           onChange={(e) => updateFormValue(e)}/>

                    <label>postDate</label>
                    <input placeholder='postDate' value={inputs.postDate}
                           onChange={(e) => updateFormValue(e)}/>

                    <label>description</label>
                    <input placeholder='description' value={inputs.description}
                           onChange={(e) => updateFormValue(e)}/>

                    <label>value</label>
                    <input placeholder='value' value={inputs.value}
                           onChange={(e) => updateFormValue(e)}/>

                    <button type='submit' onClick={updateAPIData}>Save</button>
            </form>
        </div>
    )
}

const mapStateToProps = state => ({currentTransaction: state.transactionState.currentTransaction});

export default connect(mapStateToProps)(Transaction);
