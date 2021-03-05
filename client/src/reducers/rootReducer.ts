import { Action } from '../types';
import { users } from './defaultState';
import { SEARCH } from './typesReducer';

type DefaultState = {
  searchString: string | null;
  users: {
    login: string;
    email: string;
    password: string;
  }[];
};

const defaultState: DefaultState = {
  searchString: null,
  users,
};

function reducer(state = defaultState, action: Action) {
  switch (action.type) {
    case SEARCH: {
      return {
        ...state,
        searchString: action.payload.trim(),
      };
    }

    default:
      return state;
  }
}

export default reducer;
