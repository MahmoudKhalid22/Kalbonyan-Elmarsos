import { useContext } from "react";
import FavoritesContext from "../store/favorties-context";
import MeetupList from "../components/meetups/MeetupList";
const FavoritesPage = () => {
  const favoriteCtx = useContext(FavoritesContext);

  let content;

  if (favoriteCtx.totalFavorites === 0) {
    content = <p>No favorites yet</p>;
  } else {
    content = <MeetupList meetups={favoriteCtx.favorites} />;
  }
  return (
    <section>
      <h1>Favorites Page</h1>
      {content}
    </section>
  );
};
export default FavoritesPage;
