import { Action } from '../types';
import { users } from './defaultState';
import {SEARCH, SET_CURRENT_LANGUAGE} from './typesReducer';

type DefaultState = {
  searchString: string | null;
  users: {
    login: string;
    email: string;
    password: string;
  }[];
  currentLanguage: "en" | "es" | "ru"
};

const defaultState: DefaultState = {
  searchString: null,
  users,
  currentLanguage: "ru"
};

function reducer(state = defaultState, action: Action) {
  switch (action.type) {
    case SEARCH: {
      return {
        ...state,
        searchString: action.payload.trim(),
      };
    }
    case SET_CURRENT_LANGUAGE:
      return {
        ...state,
        currentLanguage: action.payload
      }

    default:
      return state;
  }
}

export default reducer;
