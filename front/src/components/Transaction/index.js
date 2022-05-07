import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from 'react-router-dom';
import {Button, Form} from "react-bootstrap";
import axios from "axios";

const Transaction = ({ match }) => {
    const [currentAccountGuid, setCurrentAccountGuid] = useState('');
    const [accountGuid, setAccountGuid] = useState('');
    const [postDate, setPostDate] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState(0);
    const { transactionGuid } = useParams();

    useEffect(() => {
        axios.get(`https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData`)
            .then((response) => {
                setAPIData(response.data);
            })
    }, []);
    let navigate = useNavigate();

    let url = `/transaction`;

    const updateAPIData = (e) => {
        e.preventDefault();
        axios.put(url, {
            transactionGuid,
            currentAccountGuid,
            accountGuid,
            postDate,
            description,
            value
        }).then(() => {
            navigate(`/transaction/account/${currentAccountGuid}`);
        })
    }
    return (
        <div>
            <h3>ID: {transactionGuid}</h3>
{/*
            <Form onSubmit={updateAPIData} className="create-form">
                <Form.Field>
                    <label>First Name</label>
                    <input placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                </Form.Field>

                <Button type='submit' onClick={updateAPIData}>Update</Button>
            </Form>
*/}
        </div>
    )
};

export default Transaction;
