import PropTypes from "prop-types";
import { createContext, useEffect, useReducer } from "react";

import { filterSearchData, getPlaces } from "../utilities/utils";

const INITIAL_STATE = {
  apiData: [],
  places: [],
  isFetching: true,
  error: {
    isError: false,
    message: "",
  },
};

export const ACTIONS = {
  GET_PLACES: "GET_PLACES",
  ERROR: "ERROR",
  FILTER_DATA: "FILTER_DATA",
};

export const PlacesReducer = (state, actions) => {
  switch (actions.type) {
    case ACTIONS.GET_PLACES:
      return {
        apiData: actions.payload,
        places: actions.payload,
        isFetching: false,
        error: {
          isError: false,
          message: "",
        },
      };
    case ACTIONS.ERROR:
      return {
        apiData: [],
        places: [],
        isFetching: false,
        error: {
          isError: true,
          message: actions.payload.message,
        },
      };
    case ACTIONS.FILTER_DATA:
      filterSearchData(state.apiData, actions.payload);
      return {
        ...state,
        places: filterSearchData(state.apiData, actions.payload),
      };
    default:
      return state;
  }
};

export const PlacesContext = createContext(INITIAL_STATE);

export default function PlacesContextProvider({ children }) {
  const [state, dispatch] = useReducer(PlacesReducer, INITIAL_STATE);

  useEffect(() => {
    getPlaces(dispatch);
  }, []);

  return (
    <PlacesContext.Provider value={{ places: state.places, isFetching: state.isFetching, error: state.error, dispatch }}>
      {children}
    </PlacesContext.Provider>
  );
}

PlacesContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
