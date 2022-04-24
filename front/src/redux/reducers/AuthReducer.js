import axios from "axios";
import { AuthActionType } from "../actions/AuthAction";

const authState = {
  isLoggedIn: false,
  user: {
    username: "",
    email: "",
    expires: "",
    roles: [],
    accessToken: ""
  },
};
const getAuthState = () => {
  const auth = localStorage.getItem("auth");
  try {
    const authobj = JSON.parse(auth);
    const { expires, accessToken } = authobj.user;
    if (new Date(expires) > new Date()) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      return authobj;
    }
    return authState;
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
      ] = `Bearer ${action.payload.accessToken}`;
      localStorage.setItem("auth", JSON.stringify(newAuthState));
      return newAuthState;

    case AuthActionType.LOGOUT_SUCCESS:
      localStorage.removeItem("auth");
      return authState;

    case AuthActionType.LOGIN_SUCCESS:
      const loginAuthState = {
        isLoggedIn: true,
        user: action.payload,
      };
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${action.payload.accessToken}`;
      localStorage.setItem("auth", JSON.stringify(loginAuthState));
      return loginAuthState;

    default:
      return state;
  }
};

export default authreducer;
