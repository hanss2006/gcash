import React from "react";
import {connect, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";

function Header(props) {
    const {filterState} = props;
    const {filterCurrentAccountFullName} = useSelector((state) => state.filterState);
    const { keycloak, initialized } = useKeycloak();

    return (
        <header className="p-3 bg-dark text-white">
            <div className="container">
                <div className="d-flex justify-content-between">
                    <ul className="nav col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-1">
                        {!!keycloak.authenticated && (
                            <React.Fragment>
                                <li>
                                    <Link to={filterState.filterMenuLinkTo} className="nav-link px-2 text-secondary">
                                        <img src='./images/menu.png' alt="Menu" />
                                    </Link>
                                </li>
                                <li>
                                    <Link to={filterState.filterMenuLinkTo} className="nav-link px-2 text-secondary">
                                        <span>{filterCurrentAccountFullName}</span>
                                    </Link>
                                </li>
                            </React.Fragment>
                        )}
                    </ul>
                    {!keycloak.authenticated && (
                        <button
                            type="button"
                            className="btn btn-outline-light me-2" style={{height: "38px"}}
                            onClick={() => keycloak.login()}
                        >
                            Login
                        </button>
                    )}
                    {!!keycloak.authenticated && (
                        <button
                            type="button"
                            className="btn btn-outline-light me-2" style={{height: "38px"}}
                            onClick={() => keycloak.logout()}
                        >
                            Logout ({keycloak.tokenParsed.preferred_username})
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}

const mapStateToProps = (state) => {
    return {
        filterState: state.filterState,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: (navigate) => {
            //dispatch(LogOutAuthAction(navigate));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
