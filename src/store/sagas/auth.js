import { delay, put, call } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions/index';
import * as constants from '../../shared/constants';

export function* logoutSaga() {
  yield call([localStorage, 'removeItem'], 'token');
  yield call([localStorage, 'removeItem'], 'expirationDate');
  yield call([localStorage, 'removeItem'], 'userId');
  yield call([localStorage, 'removeItem'], 'userName');
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTimeout * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.userData.email,
    password: action.userData.password,
    returnSecureToken: true,
    displayName: `${action.userData.firstName} ${action.userData.lastName}`
  };
  let url = `${constants.identityToolkit}:signUp?key=${constants.keyAPI}`;
  if (!action.isSignup) url = `${constants.identityToolkit}:signInWithPassword?key=${constants.keyAPI}`;
  try {
    const response = yield axios.post(url, authData);
    const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
    yield localStorage.setItem('token', response.data.idToken);
    yield localStorage.setItem('expirationDate', expirationDate);
    yield localStorage.setItem('userId', response.data.localId);
    yield localStorage.setItem('userName', response.data.displayName);
    yield put(actions.authSuccess(response.data.idToken, response.data.localId, response.data.displayName));
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch ({ response }) {
    yield put(actions.authFail(constants.loginErrors[response.data.error.message]));
  }
}

export function* checkStateSage() {
  const token = localStorage.getItem('token');
  if (!token) {
    yield put(actions.logout());
  } else {
    const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
    if (expirationDate <= new Date()) {
      yield put(actions.logout());
    } else {
      const userId = yield localStorage.getItem('userId');
      const userName = yield localStorage.getItem('userName');
      yield put(actions.authSuccess(token, userId, userName));
      yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
    }
  }
}

