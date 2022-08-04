import "@splidejs/splide/dist/css/splide.min.css";
import "./PlaceDetails.css";

import { CircularProgress } from "@mui/material";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { PlacesContext } from "../../context/PlacesContext";
import PlaceInformation from "./PlaceInformation";

export default function PlaceDetails() {
  const { placeId } = useParams();
  const { places, isFetching, error } = useContext(PlacesContext);
  const [coffeePlace, setCoffeePlace] = useState({});
  const { name, photos } = coffeePlace;

  useEffect(() => {
    const filteredData = places.filter((place) => place.fsq_id === placeId);
    if (filteredData.length > 0) {
      const coffeePlaceData = filteredData[0];
      setCoffeePlace(coffeePlaceData);
    }
  }, [places, placeId]);

  if (error.isError) return <h1 className="no-place-data">{error.message}</h1>;

  if (isFetching)
    return (
      <div className="no-place-data">
        <CircularProgress style={{ color: "white" }} color="success" size="8rem" />
        <h5 className="loading-text">Loading!!!</h5>
      </div>
    );

  if (places.length === 0) return <h1 className="no-place-data">No Coffee Shops Found</h1>;

  return (
    <main className="place-details-container">
      <PlaceInformation coffeePlace={coffeePlace} />
      <section className="place-carousel">
        {
          <Splide
            className="place-splide"
            options={{ perPage: 1, arrows: true, type: "loop", label: "Coffee-Place-Images", speed: 1000, rewind: true, width: 600 }}
            tag="div"
          >
            {photos &&
              photos.map(({ prefix, suffix, id }) => {
                const imgURL = prefix + "original" + suffix;
                return (
                  <SplideSlide key={id}>
                    <figure className="place-card">
                      <img className="place-img" src={imgURL} alt={name} width="600" height="400" />
                    </figure>
                  </SplideSlide>
                );
              })}
          </Splide>
        }
      </section>
    </main>
  );
}
