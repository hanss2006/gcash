import axios from "axios";

const AuthActionType = {
  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  REGISTER_FAIL: "REGISTER_FAIL",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  LOGOUT_FAIL: "LOGOUT_FAIL",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAIL: "LOGIN_FAIL",
};

const RegisterAuthAction = (userState, navigate, setErrorHandler) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/register", userState);
      const { data } = res;
      dispatch({ type: AuthActionType.REGISTER_SUCCESS, payload: data });
      navigate("/");
    } catch (error) {
      if (error.response) {
        dispatch({
          type: AuthActionType.REGISTER_FAIL,
          payload: error.response.data.message,
        });
        setErrorHandler({
          hasError: true,
          message: error.response.data.message,
        });
      }
    }
  };
};

const LoginAuthAction = (loginState, navigate, setErrorHandler) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/login?clientId=gcash", loginState);
      const { data } = res;
      dispatch({ type: AuthActionType.LOGIN_SUCCESS, payload: data });
      navigate("/");
    } catch (error) {
      if (error.response) {
        dispatch({
          type: AuthActionType.LOGIN_FAIL,
          payload: error.response.data.message,
        });
      }
      setErrorHandler({ hasError: true, message: error.response.data.message });
    }
  };
};

const LogOutAuthAction = (navigate) => {
  return async (dispatch) => {
    try {
      //const res = await axios.get("/logout");
      //const { data } = res;
      dispatch({
        type: AuthActionType.LOGOUT_SUCCESS,
        payload: "",
      });
      navigate("login");
    } catch (error) {
      if (error.response) {
        dispatch({
          type: AuthActionType.LOGOUT_FAIL,
          payload: error.response.data.message,
        });
      }
    }
  };
};

export {
  RegisterAuthAction,
  AuthActionType,
  LogOutAuthAction,
  LoginAuthAction,
};
