import { BrowserRouter, Route, Routes } from "react-router-dom";

import CoffeePlace from "./CoffeePlace";
import Error from "./Error";
import Home from "./Home";

export default function Pages() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coffee-place/:placeId" element={<CoffeePlace />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}
