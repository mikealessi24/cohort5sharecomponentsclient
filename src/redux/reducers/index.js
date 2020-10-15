import { SET_SIGNED_IN, CLEAR_SIGNED_IN } from '../actions/index';

const signedIn = (state = undefined, action) => {
  switch (action.type) {
    case SET_SIGNED_IN:
      return [
        ...state,
        {
          signedIn: action.signedIn,
        },
      ];
    case CLEAR_SIGNED_IN:
      return [
        ...state,
        {
          signedIn: undefined,
        },
      ];
  }
};

export default signedIn;
