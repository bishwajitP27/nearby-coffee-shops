import { render, screen } from "@testing-library/react";

import Places from "./Places";

// eslint-disable-next-line no-undef
test("on intial render, loading text should come", () => {
  render(<Places />);
  // eslint-disable-next-line no-undef
  expect(screen.getByText(/Loading.../)).toBeInTheDocument();
});
