import * as actionTypes from './actionTypes';

export const purchasePetSuccess = (id, petData) => {
  return {
    type: actionTypes.PURCHASE_PET_SUCCESS,
    orderId: id,
    petData: petData
  };
};

export const purchasePetFail = error => {
  return {
    type: actionTypes.PURCHASE_PET_FAILED,
    error: error
  };
};

export const purchasePetStart = () => {
  return {
    type: actionTypes.PURCHASE_PET_START
  };
};

export const purchasePet = (petData, token) => {
  return {
    type: actionTypes.PURCHASE_PET,
    petData: petData,
    token: token,
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

export const initBreeds = () => {
  return {
    type: actionTypes.INIT_BREEDS,
  };
};

export const initCategory = () => {
  return {
    type: actionTypes.INIT_CATEGORY,
  };
};

export const initPets = () => {
  return {
    type: actionTypes.INIT_PETS,
  };
};

export const setCategory = categories => {
  return {
    type: actionTypes.SET_CATEGORY,
    categories
  };
};

export const fetchCategoryFailed = error => {
  return {
    type: actionTypes.FETCH_CATEGORY_FAILED,
    error
  };
};

export const setPets = pets => {
  return {
    type: actionTypes.SET_PETS,
    pets
  };
};

export const fetchPetsFailed = error => {
  return {
    type: actionTypes.FETCH_PETS_FAILED,
    error
  };
};
