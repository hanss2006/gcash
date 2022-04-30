import React, {useState} from "react";
import {connect} from "react-redux";
import {useNavigate} from 'react-router-dom';
import {LoginAuthAction} from "../../redux/actions/AuthAction";
import Header from "../layout/Header";

function Login(props) {
    const {login} = props;

    const [errorHandler, setErrorHandler] = useState({
        hasError: false,
        message: "",
    });

    const [loginState, setLoginState] = useState({});
    const navigate = useNavigate();
    return (
        <form
            className="vh-100 gradient-custom"
            onSubmit={(event) => {
                event.preventDefault();
                login(loginState, navigate, setErrorHandler);
            }}
        >
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white" style={{borderRadius: "1rem"}}>
                            <div className="card-body p-5 text-center">

                                <div className="mb-md-5 mt-md-4 pb-5">

                                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                    <p className="text-white-50 mb-5">Please enter your login and password!</p>

                                    <div className="form-outline form-white mb-4">
                                        <input
                                            id="typeUsernameX" className="form-control form-control-lg"
                                            onChange={(event) => {
                                                const username = event.target.value;
                                                setLoginState({...loginState, ...{username}});
                                            }}
                                        />
                                        <label className="form-label" htmlFor="typeEmailX">Username</label>
                                    </div>

                                    <div className="form-outline form-white mb-4">
                                        <input
                                            type="password" id="typePasswordX"
                                            className="form-control form-control-lg"
                                            onChange={(event) => {
                                                const password = event.target.value;
                                                setLoginState({...loginState, ...{password}});
                                            }}
                                        />
                                        <label className="form-label" htmlFor="typePasswordX">Password</label>
                                    </div>

                                    <button className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        /*
        <div>
            <Header errorHandler={errorHandler}/>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    login(loginState, navigate, setErrorHandler);
                }}
            >
                <div className="form-group">
                    <label htmlFor="InputEmail">Username</label>
                    <input
                        className="form-control form-control-sm"
                        onChange={(event) => {
                            const username = event.target.value;
                            setLoginState({...loginState, ...{username}});
                        }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="InputPassword1">Password</label>
                    <input
                        type="password"
                        className="form-control form-control-sm"
                        onChange={(event) => {
                            const password = event.target.value;
                            setLoginState({...loginState, ...{password}});
                        }}
                    />
                </div>
                <button type="submit" className="btn btn-danger btn-sm">
                    Submit
                </button>
            </form>
        </div>
        */
    );
}

const mapStateToProps = (state) => {
    return {
        user: state,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (loginState, navigate, setErrorHandler) => {
            dispatch(LoginAuthAction(loginState, navigate, setErrorHandler));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
