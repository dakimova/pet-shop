import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (idToken, userId, userName) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    userId,
    userName,
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT,
  };
};

export const logoutSucceed = () => {
  return {
    type: actionTypes.AUTH_LOGOUT ,
  };
};

export const checkAuthTimeout = expirationTimeout => {
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expirationTimeout: expirationTimeout,
  };
};

export const auth = (userData, isSignup) => {
  return {
    type: actionTypes.AUTH_USER,
    userData,
    isSignup: isSignup,
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_REDIRECT_PATH,
    path: path,
  };
};

export const authCheckState = () => {
  return {
    type: actionTypes.AUTH_CHECK_STATE,
  };
};
