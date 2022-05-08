import React, {useState} from "react";
import {useNavigate, useParams} from 'react-router-dom';
import axios from "axios";
import {connect} from "react-redux";
import "./index.css";

const Transaction = ({currentTransaction}) => {
    const {transactionGuid} = useParams();
    const navigate = useNavigate();
    const [inputs, setInputs] = useState(currentTransaction);
    const updateFormValue = (formValues) => {
        setInputs((inputObj) => ({...inputObj, [formValues.target.name]: formValues.target.value}));
    }
    let url = `/transaction/`;

    const updateAPIData = (e) => {
        e.preventDefault();
        axios.put(url, inputs).then(() => {
            //navigate(`../transaction/account/${inputs.currentAccountGuid}`);
            navigate(`../`);
        })
    }
    return (
        <div>
            <form onSubmit={updateAPIData}>
                <div className="form-outline mb-4">
                    <input
                        type='text'
                        id='currentAccountGuid'
                        name='currentAccountGuid'
                        className='form-control'
                        value={inputs.currentAccountGuid}
                        onChange={(e) => updateFormValue(e)}
                    />
                    <label className='form-label' htmlFor='currentAccountGuid'>currentAccountGuid</label>
                </div>
                <div className="form-outline mb-4">
                    <input
                        type='text'
                        id='accountGuid'
                        name='accountGuid'
                        className='form-control'
                        value={inputs.accountGuid}
                        onChange={(e) => updateFormValue(e)}
                    />
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

                <button type='submit' onClick={updateAPIData} className="btn btn-primary btn-block mb-4">Send</button>
            </form>
        </div>
    )
}

const mapStateToProps = state => ({currentTransaction: state.transactionState.currentTransaction});

export default connect(mapStateToProps)(Transaction);
