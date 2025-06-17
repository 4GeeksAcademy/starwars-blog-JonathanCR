import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { FaHeart } from "react-icons/fa";
import fallbackImage from "../assets/img/imagen-no-disponible.jpg"; // Imagen de respaldo personalizada

const Card = ({ item, type }) => {
  const { dispatch, store } = useGlobalReducer();
  const { favorites, saved } = store;

  const uid = item.uid || item.url?.split("/").filter(Boolean).pop();
  const imageUrl = `https://www.swapi.tech/api/${type === "people" ? "characters" : type}/${uid}.jpg`;

  const handleAddFavorite = () => {
    if (!favorites.find((fav) => fav.uid === uid)) {
      dispatch({ type: "ADD_FAVORITE", payload: { name: item.name, uid, type } });
    }
  };

  const handleAddSaved = () => {
    if (!saved.find((s) => s.uid === uid)) {
      dispatch({ type: "ADD_SAVED", payload: { name: item.name, uid, type } });
    }
  };
console.log(imageUrl)
  return (
    <div className="col">
      <div className="card h-100">
        <img
          src={imageUrl}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = fallbackImage;
          }}
          className="card-img-top"
          alt={item.name}
          style={{ objectFit: "contain", maxHeight: "200px" }}
        />
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <div className="d-flex justify-content-between">
            <Link to={`/${type}/${uid}`} className="btn btn-outline-primary">
              Ver más
            </Link>
            <button className="btn btn-outline-warning" onClick={handleAddFavorite}>
              <FaHeart />
            </button>
          </div>
          <button className="btn btn-sm btn-outline-secondary mt-2" onClick={handleAddSaved}>
            Leer después
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;