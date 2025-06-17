import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import logo from "../assets/img/logo.jpg";
import SearchBar from "../components/SearchBar";

const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();
  const { favorites, saved } = store;

  const [showFavorites, setShowFavorites] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  const favoritesRef = useRef(null);
  const savedRef = useRef(null);

  const toggleFavorites = () => {
    setShowFavorites(!showFavorites);
    setShowSaved(false); // Cierra el otro dropdown si está abierto
  };

  const toggleSaved = () => {
    setShowSaved(!showSaved);
    setShowFavorites(false);
  };

  const handleRemoveFavorite = (uid) => {
    dispatch({ type: "REMOVE_FAVORITE", payload: uid });
  };

  const handleRemoveSaved = (uid) => {
    dispatch({ type: "REMOVE_SAVED", payload: uid });
  };

  // Cierra el dropdown si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        favoritesRef.current &&
        !favoritesRef.current.contains(event.target)
      ) {
        setShowFavorites(false);
      }
      if (savedRef.current && !savedRef.current.contains(event.target)) {
        setShowSaved(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar navbar-dark bg-dark px-4 py-2 fixed-top shadow">
      <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
        <img src={logo} alt="Logo" style={{ height: "40px" }} />
      </Link>

      <div className="flex-grow-1 mx-4">
        <SearchBar />
      </div>

      <div className="d-flex align-items-center gap-3 position-relative">
        {/* Guardados */}
        <div className="position-relative" ref={savedRef} style={{ zIndex: 1050 }}>
          <button className="btn btn-secondary" onClick={toggleSaved}>
            Guardados ({saved?.length || 0})
          </button>
          {showSaved && (
            <ul className="dropdown-menu show position-absolute end-0 mt-2">
              {saved?.length === 0 ? (
                <li className="dropdown-item">Sin elementos</li>
              ) : (
                saved.map((item, index) => (
                  <li
                    key={index}
                    className="dropdown-item d-flex justify-content-between align-items-center"
                  >
                    <Link
                      to={`/${item.type}/${item.uid}`}
                      className="me-2 text-decoration-none"
                      onClick={() => setShowSaved(false)}
                    >
                      {item.name}
                    </Link>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleRemoveSaved(item.uid)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>

        {/* Favoritos */}
        <div className="position-relative" ref={favoritesRef} style={{ zIndex: 1050 }}>
          <button className="btn btn-warning" onClick={toggleFavorites}>
            Favoritos ({favorites?.length || 0})
          </button>
          {showFavorites && (
            <ul className="dropdown-menu show position-absolute end-0 mt-2">
              {favorites?.length === 0 ? (
                <li className="dropdown-item">Sin favoritos</li>
              ) : (
                favorites.map((fav, index) => (
                  <li
                    key={index}
                    className="dropdown-item d-flex justify-content-between align-items-center"
                  >
                    <Link
                      to={`/${fav.type}/${fav.uid}`}
                      className="me-2 text-decoration-none"
                      onClick={() => setShowFavorites(false)}
                    >
                      {fav.name}
                    </Link>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleRemoveFavorite(fav.uid)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;