import "./card.css";

import { Rating } from "@mui/material";
import PropTypes from "prop-types";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function Card({ place }) {
  const { name, location, categories, rating } = place;
  const { address, locality } = location;

  const imgURL = categories.length > 0 && categories[0] ? categories[0].icon.prefix + "64" + categories[0].icon.suffix : "";

  return (
    <div className="card">
      <p className="card-title">{name}</p>
      <section className="card-details">
        <img className="card-image" src={imgURL} alt={name} width="64" />
        <section className="card-location">
          <FaMapMarkerAlt className="map-icon" />
          {!address && !locality && <p className="stree-address">Address not available</p>}
          {(address || locality) && <p className="stree-address">{`${address ? address : ""}, ${locality ? locality : ""}`}</p>}
        </section>
      </section>
      <section className="place-rating">
        <Rating readOnly size="large" value={rating ? rating / 2 : 0} />
      </section>
    </div>
  );
}

Card.propTypes = {
  place: PropTypes.shape({
    name: PropTypes.string.isRequired,
    rating: PropTypes.number,
    location: PropTypes.shape({
      address: PropTypes.string,
      locality: PropTypes.string,
    }),
    categories: PropTypes.arrayOf(PropTypes.object),
  }),
};
