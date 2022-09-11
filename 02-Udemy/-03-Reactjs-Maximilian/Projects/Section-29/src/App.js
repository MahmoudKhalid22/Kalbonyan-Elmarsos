import { Routes, Route } from "react-router-dom";
//Route to define different paths in url and witch component
import AllMeetupsPage from "./pages/AllMeetups";
import NewMeetupPage from "./pages/NewMeetup";
import FavoritesPage from "./pages/Favorites";
import Layout from "./components/layout/Layout";

const App = () => {
  // <Routes>
  return (
    <Layout>
      <Route path="/" exact>
        <AllMeetupsPage />
      </Route>

      <Route path="/new-meetup">
        <NewMeetupPage />
      </Route>

      <Route path="/favorites">
        <FavoritesPage />
      </Route>
    </Layout>
  );
};

export default App;
