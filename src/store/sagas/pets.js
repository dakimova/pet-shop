import { put } from 'redux-saga/effects';

import axios from '../../axios-purchase';
import * as actions from '../actions/index';

export function* purchasePetSaga(action) {
  yield put(actions.purchasePetStart());
  try {
    const response = yield axios.post('/pets.json', action.petData);
    yield put(actions.purchasePetSuccess( response.data.name, action.petData ));
  } catch (error) {
    yield put(actions.purchasePetFail( error ));
  }
}

export function* initBreedsSaga() {
  try {
    const response = yield axios.get('/breeds.json');
    console.log('initBreedsSaga', response);
    // yield put(actions.setBreeds(response.data));
  } catch (error) {
    // yield put(actions.fetchBreedsFailed());
  }
}

export function* initCategorySaga() {
  try {
    const response = yield axios.get('/category.json');
    const convertedValue = Object.keys(response.data)
      .map (key => Object.assign({ key }, response.data[key]));
    yield put(actions.setCategory(convertedValue));
  } catch (error) {
    yield put(actions.fetchCategoryFailed(error));
  }
}

export function* initPetsSaga() {
  try {
    const response = yield axios.get('/pets.json?');
    const convertedValue = Object.keys(response.data)
      .map (key => Object.assign({ key }, response.data[key]));
    yield put(actions.setPets(convertedValue));
  } catch (error) {
    yield put(actions.fetchPetsFailed(error));
  }
}
