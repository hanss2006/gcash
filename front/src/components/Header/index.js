import React, {useContext} from "react";
import {connect, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {KeycloackContext} from "../../KeycloakContext";

function Header(props) {
    const {filterState} = props;
    const {filterCurrentAccountFullName} = useSelector((state) => state.filterState);
    const { keycloackValue, authenticated } = useContext(KeycloackContext)

    return (
        <header className="p-3 bg-dark text-white">
            <div className="container">
                <div className="d-flex justify-content-between">
                    <ul className="nav col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-1">
                        {authenticated ? (
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
                        ) : (
                            <React.Fragment>
                            </React.Fragment>
                        )}
                    </ul>
                    {!authenticated ? (
                        <React.Fragment>
{/*
                            <Link to="./login">
                                <button type="button" className="btn btn-outline-light me-2" style={{height: "38px"}}>Login</button>
                            </Link>
*/}
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <button type="button" className="btn btn-outline-light me-2" style={{height: "38px"}}
                                    onClick={() => {
                                        keycloackValue.logout();
                                    }}
                            >
                                Logout
                            </button>
                        </React.Fragment>
                    )}
                </div>
            </div>
        </header>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.authState,
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
