import { LOAD_USERVALIDATION, LOAD_USERVALIDATION_SUCCESS, LOAD_USERVALIDATION_FAIL, USER_SIGNUP_SUCCESS } from '../constants/ActionTypes';

const initialState = {
  loaded: false,
  data: [],
  activeUser: null
};

export default function userValidation(state = initialState, action) {
  switch (action.type) {
    case LOAD_USERVALIDATION:
      return { ...state,
        loading: true
      };
    case LOAD_USERVALIDATION_SUCCESS:
      return { ...state,
        loading: false,
        loaded: true,
        data: action.json
      };
    case LOAD_USERVALIDATION_FAIL:
      return { ...state,
        loading: false,
        loaded: false,
        error: action.error,
        data: [...state.data]
      };
    case USER_SIGNUP_SUCCESS:
      return { ...state, activeUser: action.newUser };
    default:
      return state;
  }
}
