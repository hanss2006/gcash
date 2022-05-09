import React from "react";
import {connect} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {LogOutAuthAction} from "../../redux/actions/AuthAction";

function Header(props) {
    const {auth, logout, filterState} = props;
    const navigate = useNavigate();
    return (
        <header className="p-3 bg-dark text-white">
            <div className="container">
                <div className="d-flex justify-content-between">
                    <ul className="nav col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-1">
                        {auth.isLoggedIn ? (
                            <React.Fragment>
                                <li>
                                    <Link to={filterState.filterMenuLinkTo} className="nav-link px-2 text-secondary">
                                        <img src='/images/menu.png' alt="Menu" />
                                    </Link>
                                </li>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                            </React.Fragment>
                        )}
                    </ul>
                    {!auth.isLoggedIn ? (
                        <React.Fragment>
                            <Link to="./login">
                                <button type="button" className="btn btn-outline-light me-2" style={{height: "38px"}}>Login</button>
                            </Link>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <button type="button" className="btn btn-outline-light me-2" style={{height: "38px"}}
                                    onClick={() => {
                                        logout(navigate);
                                    }}
                            >
                                Logout
                            </button>
                        </React.Fragment>
                    )}
                </div>
            </div>
        </header>
        /*
          <div className="header d-flex justify-content-center py-2 shadow-sm">
            <ErrorHandler
              errorHandler={errorHandler || { hasError: false, message: "" }}
            />
            <Link to="/">
              <h5 className="font-weight-bold text-danger mx-3">Gcash</h5>
            </Link>
            <div className="ml-auto d-flex">
              {!auth.isLoggedIn ? (
                <React.Fragment>
                  <Link to="./login">
                    <button className="btn btn-danger btn-sm mx-2">Login</button>
                  </Link>
                  <Link to="./register">
                    <button className="btn btn-danger btn-sm mr-5">Sign up</button>
                  </Link>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <h5>{auth.user.name}</h5>
                  <button
                    className="btn btn-danger btn-sm mx-2"
                    onClick={() => {
                      logout(navigate);
                    }}
                  >
                    Log Out
                  </button>
                </React.Fragment>
              )}
            </div>
          </div>
      */
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
            dispatch(LogOutAuthAction(navigate));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
