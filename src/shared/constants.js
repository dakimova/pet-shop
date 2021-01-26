export const homeUrl = '/';
export const defaultUrl = '/';
export const loginUrl = '/sign-in';
export const signupUrl = '/sign-up';
export const logoutUrl = '/logout';
export const addPetUrl = '/add-pet';
export const updatePetUrl = '/update-pet/:petId';
export const petsAdsUrl = '/pets-ads';

export const adsParamName = 'category';

export const identityToolkit = 'https://identitytoolkit.googleapis.com/v1/accounts';
export const keyAPI = 'AIzaSyBZzTcsiCPxow-PEgKlgOqcnkgwh5hF780';

export const loginErrors = {
  INVALID_CUSTOM_TOKEN: `The custom token format is incorrect or the token is invalid for some reason 
  (e.g. expired, invalid signature etc.)`,
  CREDENTIAL_MISMATCH: 'The custom token corresponds to a different GCP project.',
  EMAIL_EXISTS: 'The email address is already in use by another account.',
  OPERATION_NOT_ALLOWED: 'Password sign-in is disabled for this project.',
  TOO_MANY_ATTEMPTS_TRY_LATER: `We have blocked all requests from this device due to unusual activity.
  Try again later.`,
  EMAIL_NOT_FOUND: 'There is no user record corresponding to this identifier. The user may have been deleted.',
  INVALID_PASSWORD: 'The password is invalid or the user does not have a password.',
  USER_DISABLED: 'The user account has been disabled by an administrator.',
  TOKEN_EXPIRED: 'The user\'s credential is no longer valid. The user must sign in again.',
  USER_NOT_FOUND: 'The user corresponding to the refresh token was not found. It is likely the user was deleted.',
  INVALID_REFRESH_TOKEN: `An invalid refresh token is provided. Invalid JSON payload received.
  Unknown name "refresh_tokens": Cannot bind query parameter.`,
  INVALID_GRANT_TYPE: 'the grant type specified is invalid.',
  MISSING_REFRESH_TOKEN: 'no refresh token provided.',
  INVALID_EMAIL: 'The email address is badly formatted.',
  INVALID_ID_TOKEN: 'The user\'s credential is no longer valid. The user must sign in again.',
};
