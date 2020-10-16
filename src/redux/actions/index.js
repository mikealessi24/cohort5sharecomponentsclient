export const SET_SIGNED_IN = 'SET_SIGNED_IN';
export const CLEAR_SIGNED_IN = 'CLEAR_SIGNED_IN';

export const setSignedIn = (signedIn) => ({
  type: SET_SIGNED_IN,
  signedIn,
});

export const clearSignedIn = (signedIn) => ({
  type: CLEAR_SIGNED_IN,
  signedIn: undefined,
});
