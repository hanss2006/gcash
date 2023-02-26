import React, {useEffect, useState} from "react";
//import useFullPageLoader from "../../hooks/useFullPageLoader";
import Tree from "../Tree";
import {useDispatch, useSelector} from "react-redux";
import {setFilterMenuLinkTo} from "../../redux/actions/filterAction";
import {axiosPrivate} from "../../helpers/axiosPrivate";

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
    const {filterCurrentAccountGuid} = useSelector((state) => state.filterState);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setFilterMenuLinkTo(`/transactions/account/${filterCurrentAccountGuid}`));
        //showLoader();
        axiosPrivate.get(url)
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
        <React.Fragment>
            <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                <div className="position-sticky pt-3">
                    <ul className="nav flex-column">
                        <Tree data={accTree.children}/>
                    </ul>
                </div>
            </nav>
        </React.Fragment>
    );
};

export default TreePage;
