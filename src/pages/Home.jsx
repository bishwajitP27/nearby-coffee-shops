import Header from "../components/header/Header";
import Places from "../components/places/Places";

export default function Home() {
  return (
    <>
      <Header isHome={true} />
      <Places />
    </>
  );
}
