import { useReducer, useEffect } from "react";
import axios from "axios";

const ACTIONS = {
  MAKE_REQUEST: "MAKE_REQUEST",
  GET_DATA: "GET_DATA",
  ERROR: "ERROR"
};

const BASE_URL = "https://reqres.in/api/users";

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return { loading: true, users: [] };
    case ACTIONS.GET_DATA:
      return { ...state, loading: false, users: action.payload.users };
    case ACTIONS.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        users: []
      };

    default:
      return state;
  }
}

export default function useFetchUsers() {
  const [state, dispatch] = useReducer(reducer, { users: [], loading: true });

  useEffect(() => {
    dispatch({ type: ACTIONS.MAKE_REQUEST });
    axios
      .get(BASE_URL)
      .then(res => {
        dispatch({ type: ACTIONS.GET_DATA, payload: { users: res.data.data } });
      })
      .catch(e => {
        dispatch({ type: ACTIONS.ERROR, payload: { error: e } });
      });
  }, []);

  return state;
}
