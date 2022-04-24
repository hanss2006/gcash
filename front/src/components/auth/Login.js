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
