import { BrowserRouter as Router, Link } from "react-router-dom";
import { useContext } from "react";

import classes from "./MainNavigation.module.css";
import FavoritesContext from "../../store/favorties-context";

function MainNavigation() {
  const favoriteCtx = useContext(FavoritesContext);
  ///////
  return (
    <Router>
      <header className={classes.header}>
        <div className={classes.logo}>React Meetups</div>
        <nav>
          <ul>
            <li>
              <Link to="/">All Meetups</Link>
            </li>
            <li>
              <Link to="/new-meetup">Add New Meetup</Link>
            </li>
            <li>
              <Link to="/favorites">
                My Favorites
                <span className={classes.badge}>
                  {favoriteCtx.totalFavorites}
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </Router>
  );
}

export default MainNavigation;
