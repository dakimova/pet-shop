import * as actionTypes from '../actions/actionTypes';

const initialState = {
  breeds: [],
  categories: [],
  petList: [],
  error: null,
};

const setCategory = (state, action) => {
  return {
    ...state,
    categories: action.categories
  };
};
const fetchCategoryFailed = (state, action) => {
  return {
    ...state,
    error: action.error
  };
};

const setPets = (state, action) => {
  return {
    ...state,
    petList: action.pets
  };
};
const fetchPetsFailed = (state, action) => {
  return {
    ...state,
    error: action.error
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.SET_CATEGORY: return setCategory(state, action);
  case actionTypes.FETCH_CATEGORY_FAILED: return fetchCategoryFailed(state, action);
  case actionTypes.SET_PETS: return setPets(state, action);
  case actionTypes.FETCH_PETS_FAILED: return fetchPetsFailed(state, action);
  default:
    return state;
  }
};

export default reducer;
