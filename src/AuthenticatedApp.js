import { useState, useEffect } from "react";
import {
  createFavorite,
  getFavorites,
  removeFavorite,
} from "./services/favorites-service";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SearchUsers } from "./pages/search-users";
import Navbar from "./components/navbar";
import Favorites from "./pages/favorites";
import Followers from "./pages/followers";
import Following from "./pages/following";
import Repos from "./pages/repos";
import Gists from "./pages/gists";
import ProfileForm from "./components/profile-form";

const AuthenticatedApp = () => {
  const [favorites, setFavorites] = useState([]);
  // const [username, setUsername] = useState("");

  useEffect(() => {
    getFavorites()
      .then((fav) => setFavorites(fav))
      .catch((error) => console.log(error));
  }, []);

  function handleFavorite(data) {
    const fav = [...favorites].find((obj) => {
      return obj["username"] === data.username;
    });
    if (fav) {
      removeFavorite(fav.id)
        .then(
          setFavorites(
            [...favorites].filter((obj) => obj["username"] !== fav.username)
          )
        )
        .catch(console.log);
    } else {
      createFavorite(data)
        .then((newFavorite) => setFavorites([...favorites, newFavorite]))
        .catch(console.log);
    }
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <BrowserRouter>
          <Routes>
            {["/", "/search", "/search/:username"].map((path, index) => {
              return (
                <Route
                  path={path}
                  element={
                    <SearchUsers
                      favorites={favorites}
                      onToggleFav={handleFavorite}
                    />
                  }
                  key={index}
                />
              );
            })}

            <Route
              path="/favorites"
              element={
                <Favorites favorites={favorites} onToggleFav={handleFavorite} />
              }
            ></Route>
            <Route path="/profile" element={<ProfileForm />}></Route>
            <Route
              path={`/search/:username/followers`}
              element={<Followers />}
            ></Route>
            <Route
              path={`/search/:username/following`}
              element={<Following />}
            ></Route>
            <Route path={`/search/:username/repos`} element={<Repos />}></Route>
            <Route path={`/search/:username/gists`} element={<Gists />}></Route>
          </Routes>
          <Navbar></Navbar>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default AuthenticatedApp;
