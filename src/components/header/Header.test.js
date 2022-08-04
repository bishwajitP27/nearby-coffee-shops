/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Header from "./Header";

test("ron initial render, header searchbar should be empty", () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );

  expect(screen.getByPlaceholderText(/Where do you want to go for coffee?/)).toHaveValue("");
});
