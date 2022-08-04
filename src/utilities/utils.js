import { ACTIONS } from "../context/PlacesContext";

export const API_KEY = process.env.REACT_APP_FOUR_SQUARE_API_KEY;
export async function makeRequest(URL, options = {}, params = {}) {
  try {
    const paramString = new URLSearchParams(params);
    const response = await fetch(`${URL}?${paramString}`, options);

    if (response.ok) {
      const responseData = await response.json();
      return responseData ? responseData.results : [];
    } else {
      const error = new Error("Something Went Wrong. Please try again.");
      return error;
    }
  } catch (err) {
    const error = new Error("Something Went Wrong. Please try again.");
    return error;
  }
}

export async function getPlaces(dispatch) {
  try {
    const URL = "https://api.foursquare.com/v3/places/search";
    const options = {
      headers: {
        Accept: "application/json",
        Authorization: API_KEY,
      },
    };

    const params = {
      query: "coffee",
      radius: "100000",
      limit: "50",
      fields: ["categories", "location", "description", "rating", "name", "fsq_id", "photos", "social_media", "tel"],
    };

    const results = await makeRequest(URL, options, params);

    if (results.name === "Error") {
      const errorMessage = "Something Went Wrong. Please try again.";
      dispatch({ type: ACTIONS.ERROR, payload: { message: errorMessage } });
      return;
    }

    dispatch({ type: ACTIONS.GET_PLACES, payload: results });
  } catch (err) {
    const errorMessage = "Something Went Wrong. Please try again.";
    dispatch({ type: ACTIONS.ERROR, payload: { message: errorMessage } });
  }
}

export function filterSearchData(data, payload) {
  const searchText = payload.searchText.toLowerCase();
  return data.filter((place) => {
    return place.name.toLowerCase().includes(searchText);
  });
}
