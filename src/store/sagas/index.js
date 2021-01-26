import { takeEvery, takeLatest, all } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, checkStateSage } from './auth';
import { purchasePetSaga, initBreedsSaga, initCategorySaga, initPetsSaga } from './pets';

export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_USER, authUserSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATE, checkStateSage),
  ]);
}

export function* watchPets() {
  yield all([
    takeLatest(actionTypes.PURCHASE_PET, purchasePetSaga),
    takeEvery(actionTypes.INIT_BREEDS, initBreedsSaga),
    takeEvery(actionTypes.INIT_CATEGORY, initCategorySaga),
    takeEvery(actionTypes.INIT_PETS, initPetsSaga),
  ]);
}
