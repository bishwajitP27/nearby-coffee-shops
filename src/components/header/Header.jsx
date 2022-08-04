import "./header.css";

import SearchIcon from "@mui/icons-material/Search";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";

import { ACTIONS, PlacesContext } from "../../context/PlacesContext";

export default function Header() {
  const { placeId } = useParams();
  const { dispatch, places } = useContext(PlacesContext);

  const clickHandler = (event) => {
    dispatch({ type: ACTIONS.FILTER_DATA, payload: { searchText: event.target.value } });
  };

  const blurHandler = (event) => {
    event.target.value = "";
    if (places.length === 0) dispatch({ type: ACTIONS.FILTER_DATA, payload: { searchText: "" } });
  };

  return (
    <header className="header">
      <div className="header-container">
        <section className="header-left">
          <div className="logo">
            <Link className="logo-title text-upper" to="/">
              Coffee Places
            </Link>
          </div>
        </section>
        {!placeId && (
          <section className="header-center">
            <div className="search-bar">
              <SearchIcon className="search-icon" />
              <input
                type="text"
                onBlur={blurHandler}
                onChange={clickHandler}
                placeholder="Where do you want to go for coffee?"
                className="search-input"
              />
            </div>
          </section>
        )}
        <section className="header-right">
          <div className="header-links">
            <Link className="header-link text-upper" to="/">
              Home
            </Link>
          </div>
        </section>
      </div>
    </header>
  );
}
