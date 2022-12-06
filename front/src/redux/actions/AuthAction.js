import axios from "axios";

const AuthActionType = {
  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  REGISTER_FAIL: "REGISTER_FAIL",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  LOGOUT_FAIL: "LOGOUT_FAIL",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  REFRESH_SUCCESS: "REFRESH_SUCCESS",
  LOGIN_FAIL: "LOGIN_FAIL",
  REFRESH_FAIL: "REFRESH_FAIL",
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
      const res = await axios.post("/auth/login", loginState);
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

const RefreshAuthAction = (setErrorHandler) => {
  return async (dispatch) => {
    try {
      const auth = sessionStorage.getItem("auth");
      const authobj = JSON.parse(auth);
      const { refresh_token } = authobj.user;
      const res = await axios.post("/auth/refresh", { token: refresh_token });
      const { data } = res;
      dispatch({ type: AuthActionType.REFRESH_SUCCESS, payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: AuthActionType.REFRESH_FAIL,
          payload: error.response.data.message,
        });
      }
      setErrorHandler({ hasError: true, message: error.response.data.message });
    }
  };
};

axios.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;

      if (originalConfig.url !== "/auth/login" && err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          try {
            const auth = sessionStorage.getItem("auth");
            const authobj = JSON.parse(auth);
            const { refresh_token } = authobj.user;
            delete axios.defaults.headers.common["Authorization"];
            const rs = await axios.post("/auth/refresh", {
              token: refresh_token,
            });
            axios.defaults.headers.common["Authorization"] = `Bearer ${rs.access_token}`;
            const loginAuthState = {
              isLoggedIn: true,
              user: rs,
            };
            sessionStorage.setItem("auth", JSON.stringify(loginAuthState));
            return axios(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }

      return Promise.reject(err);
    }
);

const LogOutAuthAction = (logoutState, navigate) => {
  return async (dispatch) => {
    try {
      const auth = sessionStorage.getItem("auth");
      const authobj = JSON.parse(auth);
      const { refresh_token } = authobj.user;
      const res = await axios.post("/auth/logout", { token: refresh_token });
      const { data } = res;
      dispatch({
        type: AuthActionType.LOGOUT_SUCCESS,
        payload: data,
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
