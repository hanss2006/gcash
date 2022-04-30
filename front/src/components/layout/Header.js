import React from "react";
import {connect} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {LogOutAuthAction} from "../../redux/actions/AuthAction";
import ErrorHandler from "../Error/ErrorHandler";

function Header(props) {
    const {auth, logout, errorHandler} = props;
    const navigate = useNavigate();
    return (
        <header className="p-3 bg-dark text-white">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <ul className="nav col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-1">
                        <li><Link to="transactions" className="nav-link px-2 text-secondary">...</Link></li>
                        <li><Link to="tree" className="nav-link px-2 text-secondary">+++</Link></li>
                    </ul>


                    <div className="text-end">
                        <div className="d-flex justify-content-between">
                            <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                                <input type="search" className="form-control form-control-dark" placeholder="Search..."
                                       aria-label="Search"/>
                            </form>
                            <button type="button" className="btn btn-outline-light me-2" style = {{height: "38px"}}>Login</button>
                        </div>
                    </div>
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
