import "./places.css";

import { CircularProgress } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { PlacesContext } from "../../context/PlacesContext";
import Card from "../card/Card";

export default function Places() {
  const { places, isFetching, error } = useContext(PlacesContext);
  const [pageNumber, setPageNumber] = useState(0);
  const [showPlaces, setShowPlaces] = useState([]);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const pageEnd = useRef(null);

  const loadMore = () => {
    setPageNumber((pageNumber) => pageNumber + 1);
  };

  useEffect(() => {
    // Added this setTimeout just to mimmick the behaviour of subsequent API calls in case of infinite Scrolling
    let timeoutId;
    if (places.length > 0) {
      timeoutId = setTimeout(() => {
        const startIndex = 0;
        const endIndex = pageNumber * 10 + 10;
        setShowPlaces(places.slice(startIndex, endIndex));
        !isPageLoaded && setIsPageLoaded(true);
      }, 500);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [pageNumber, places]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { threshold: 1 }
    );
    pageEnd.current && observer.observe(pageEnd.current);

    return () => {
      pageEnd.current && observer.unobserve(pageEnd.current);
    };
  }, [pageEnd.current]);

  if (error.isError) return <h1 className="no-place-data">{error.message}</h1>;

  if (isFetching || !isPageLoaded)
    return (
      <div className="no-place-data">
        <CircularProgress style={{ color: "white" }} color="success" size="8rem" />
        <h5 className="loading-text">Loading...</h5>
      </div>
    );

  if (places.length === 0) return <h1 className="no-place-data">No Coffee Shops Found</h1>;

  return (
    <main className="place-container">
      {showPlaces.map((place) => {
        return (
          <div style={{ width: "100%", display: "flex", justifyContent: "center" }} key={place.fsq_id}>
            <Link to={`/coffee-place/${place.fsq_id}`} className="place-wrapper">
              <Card place={place} />;
            </Link>
          </div>
        );
      })}
      <div ref={pageEnd}>
        {showPlaces.length > 0 && showPlaces.length !== places.length && (
          <div>
            <CircularProgress style={{ color: "white" }} color="success" size="2rem" />
            <h5 style={{ color: "white" }}>Loading...</h5>
          </div>
        )}
      </div>
    </main>
  );
}
