import axios from "axios";
import {AuthActionType, LoginAuthAction, LogOutAuthAction} from "../actions/AuthAction";

const authState = {
  isLoggedIn: false,
  user: {
    username: "",
    email: "",
    expires: "",
    roles: [],
    access_token: "",
    refresh_token: ""
  },
};

const getAuthState = () => {
  const auth = sessionStorage.getItem("auth");
  try {
    const authobj = JSON.parse(auth);
    const { access_token, refresh_token } = authobj.user;
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    return authobj;
  } catch (error) {
    return authState;
  }
};
const newAuth = getAuthState();
const authreducer = (state = newAuth, action) => {
  switch (action.type) {
    case AuthActionType.REGISTER_SUCCESS:
      const newAuthState = {
        isLoggedIn: true,
        user: action.payload,
      };
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${action.payload.access_token}`;
      sessionStorage.setItem("auth", JSON.stringify(newAuthState));
      return newAuthState;

    case AuthActionType.LOGOUT_SUCCESS:
      sessionStorage.removeItem("auth");
      return authState;

    case AuthActionType.LOGIN_SUCCESS:
      const loginAuthState = {
        isLoggedIn: true,
        user: action.payload,
      };
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${action.payload.access_token}`;
      sessionStorage.setItem("auth", JSON.stringify(loginAuthState));
      return loginAuthState;

    case AuthActionType.REFRESH_SUCCESS:
      const refreshAuthState = {
        isLoggedIn: true,
        user: action.payload,
      };
      axios.defaults.headers.common[
          "Authorization"
          ] = `Bearer ${action.payload.access_token}`;
      sessionStorage.setItem("auth", JSON.stringify(refreshAuthState));
      return refreshAuthState;

    default:
      return state;
  }
};

export default authreducer;
