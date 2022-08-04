import "../components/places/places.css";

import { Link } from "react-router-dom";

import Header from "../components/header/Header";

export default function Error() {
  return (
    <>
      <Header />
      <section className="error-container">
        <h2>404</h2>
        <p>page not found</p>
        <Link to="/"> Back Home</Link>
      </section>
    </>
  );
}
