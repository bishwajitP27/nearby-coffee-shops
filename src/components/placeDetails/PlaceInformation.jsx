import PropTypes from "prop-types";
import { BsFillTelephoneFill, BsTwitter } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function PlaceInformation({ coffeePlace }) {
  const { social_media, location, rating, categories, tel, name } = coffeePlace;

  if (!name)
    return (
      <section className="error-container">
        <p>Place information not found</p>
        <Link to="/"> Back Home</Link>
      </section>
    );

  const categoriesText =
    categories && categories.reduce((result, category, index) => `${result} ${index > 0 ? "|" : ""} ${category.name}`, "");

  const addressText = location && `${location.address_extended ? location.address_extended + "|" : ""} ${location.locality}`;

  return (
    <section className="place-information-container">
      <p className="place-title">{name}</p>
      {categories && <section className="categories">{categoriesText}</section>}
      <section className="place-address">
        {location && (
          <section className="place-location">
            <p className="street-address">{addressText}</p>
          </section>
        )}
      </section>
      <button className="rating">{rating}</button>
      {social_media && social_media.twitter && (
        <section className="socialMedia">
          <BsTwitter />
          <div className="twitter">{social_media.twitter}</div>
        </section>
      )}
      {tel && (
        <section className="phone-number">
          <BsFillTelephoneFill />
          <p className="number">{tel}</p>
        </section>
      )}
    </section>
  );
}

PlaceInformation.propTypes = {
  coffeePlace: PropTypes.shape({
    name: PropTypes.string,
    rating: PropTypes.number,
    location: PropTypes.shape({
      address: PropTypes.string,
      locality: PropTypes.string,
      address_extended: PropTypes.string,
    }),
    tel: PropTypes.string,
    social_media: PropTypes.shape({
      twitter: PropTypes.string,
    }),
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ),
  }),
};
