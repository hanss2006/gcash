import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useState} from "react";
import "./index.css";
import * as fontawesome from "@fortawesome/fontawesome-svg-core";
import {faCaretRight} from "@fortawesome/free-solid-svg-icons";
import {useDispatch} from "react-redux";
import {
    setFilterCurrentAccountFullName,
    setFilterCurrentAccountGuid,
    setFilterMenuLinkTo
} from "../../redux/actions/filterAction";
import {axiosPrivate} from "../../helpers/axiosPrivate";

const Tree = ({data = []}) => {
    return (
        <React.Fragment>
            {data.map((tree) => (
                <TreeNode key={tree.guid} node={tree}/>
            ))}
        </React.Fragment>
    );
};

const TreeNode = ({node}) => {
    const dispatch = useDispatch();
    const selectCurrentAccount = (guid) => {
        setChildVisiblity((v) => !v);
        dispatch(setFilterCurrentAccountGuid(guid));
        dispatch(setFilterMenuLinkTo(`/transactions/account/${guid}`));
        loadTotal(guid);
    };

    const loadTotal = (filterCurrentAccountGuid) => {
        axiosPrivate.get(`/transaction/sum/account/${filterCurrentAccountGuid}`)
            .then(res => {
                dispatch(setFilterCurrentAccountFullName(`${res.data.accountFullName} : ${res.data.accountTotal}`));
            })
            .catch(error => {
                if (error.response) {
                    console.log("Error: ", error.response.message)
                }
            });
    }

    const [childVisible, setChildVisiblity] = useState(false);

    const hasChild = node.children ? true : false;

    fontawesome.library.add(faCaretRight);

    return (
        <li key={node.guid} className="d-tree-node border-0">
            <div className="d-flex" onClick={(e) => selectCurrentAccount(node.guid)}>
                {hasChild && (
                    <div
                        className={`d-inline d-tree-toggler ${
                            childVisible ? "active" : ""
                        }`}
                    >
                        <FontAwesomeIcon icon="caret-right"/>
                    </div>
                )}

                <div className="col d-tree-head">
                    <i className={`mr-2 fa fa-folder`}>
                        <div className="tree-item">
                            {node.name}
                        </div>
                    </i>
                </div>
            </div>

            {hasChild && childVisible && (
                <div className="d-tree-content">
                    <ul className="d-flex d-tree-container flex-column">
                        <Tree data={node.children}/>
                    </ul>
                </div>
            )}
        </li>
    );
};

export default Tree;
