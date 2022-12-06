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
  const session = sessionStorage.getItem("session");
  if (session?.user?.access_token) {
    return JSON.parse(sessionStorage.getItem("session"));
  }
  return authState;
};

const newAuth = getAuthState();
const authreducer = (state = newAuth, action) => {
  switch (action.type) {
    case AuthActionType.REGISTER_SUCCESS:
      const newAuthState = {
        isLoggedIn: true,
        user: action.payload,
      };
      sessionStorage.setItem("session", JSON.stringify(newAuthState));
      return newAuthState;

    case AuthActionType.LOGOUT_SUCCESS:
      sessionStorage.removeItem("session");
      return authState;

    case AuthActionType.LOGIN_SUCCESS:
      const loginAuthState = {
        isLoggedIn: true,
        user: action.payload,
      };
      sessionStorage.setItem("session", JSON.stringify(loginAuthState));
      return loginAuthState;

    default:
      return state;
  }
};

export default authreducer;
