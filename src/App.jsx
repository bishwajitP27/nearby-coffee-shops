import PlacesContextProvider from "./context/PlacesContext";
import Pages from "./pages/Pages";

export default function App() {
  return (
    <PlacesContextProvider>
      <Pages />
    </PlacesContextProvider>
  );
}
