import React, {useEffect, useState} from "react";
//import useFullPageLoader from "../../hooks/useFullPageLoader";
import Tree from "../Tree";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setFilterMenuLinkTo} from "../../redux/actions/filterAction";

const TreePage = () => {
    const url = '/account/tree?guid=root';

    const [accTree, setAccTree] = useState([]);
/*
    const [errorHandler, setErrorHandler] = useState({
        hasError: false,
        message: "",
    });
    const [showLoader, hideLoader] = useFullPageLoader();
*/
    const  { filterCurrentAccountGuid } = useSelector((state) => state.filterState);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setFilterMenuLinkTo(`/transactions/account/${filterCurrentAccountGuid}`));
        //showLoader();
        axios.get(url)
            .then(res => {
                setAccTree(res.data);
            })
            .catch(error => {
                if (error.response) {
/*
                    setErrorHandler({
                        hasError: true,
                        message: error.response.data.message,
                    });
*/
                }
            })
            .finally(() => {
                //hideLoader();
            });
    }, []);


    return (
        <>
            <div className="col-lg-8 text-left text-dark">
                <Tree data={accTree.children}/>
            </div>
        </>
    );
};

export default TreePage;
