import {
  FAV_ADD,
  FAV_REMOVE,
  FETCH_SUCCESS,
  FETCH_LOADING,
  FETCH_ERROR,
  GET_FAVS_FROM_LS,
  RESET_LOCAL
} from "./actions";

import { toast } from 'react-toastify';

const initial = {
  favs: [],
  current: null,
  error: null,
  loading: false,
};

function writeFavsToLocalStorage(state) {
  localStorage.setItem("s10g4", JSON.stringify(state.favs));
}

function readFavsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("s10g4"));
}

export function myReducer(state = initial, action) {
  switch (action.type) {
    case FAV_ADD:
      if (!state.favs.includes(action.payload)) {
        let newState = {
          ...state,
          favs: [...state.favs, action.payload]
        }
        writeFavsToLocalStorage(newState);
        toast.success("Favorilere eklendi!");
        return newState;
      } else {
        return state
      };
    case FAV_REMOVE:
      let newState = {
        ...state,
        favs: state.favs.filter((item) => item.activity !== action.payload)
      };
      writeFavsToLocalStorage(newState)
      return newState

    case RESET_LOCAL:
      let resetState = {
        ...state,
        favs: []
      };
      writeFavsToLocalStorage(resetState)
      return resetState;

    case FETCH_SUCCESS:
      return {
        ...state,
        current: action.payload,
        loading: false
      }

    case FETCH_LOADING:
      return {
        ...state,
        loading: true,
        current: null
      }

    case FETCH_ERROR:
      toast.error(action.payload);
      return {
        ...state,
        error: action.payload,
        loading: false,
        current: null
      }

    case GET_FAVS_FROM_LS:
      return {
        ...state,
        favs: readFavsFromLocalStorage() || [],
      }

    default:
      return state;
  }
}
