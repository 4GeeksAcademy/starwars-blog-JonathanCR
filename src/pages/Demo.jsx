import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const Demo = () => {
  const { store, dispatch } = useGlobalReducer();

  return (
    <div className="container mt-4">
      <h2>Lista de Favoritos</h2>
      <ul className="list-group">
        {store.favorites.length === 0 ? (
          <li className="list-group-item">No hay favoritos aún</li>
        ) : (
          store.favorites.map((item, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <Link to={`/${item.type}/${item.uid}`} className="text-decoration-none">
                {item.name}
              </Link>
              <button
                className="btn btn-sm btn-danger"
                onClick={() =>
                  dispatch({ type: "REMOVE_FAVORITE", payload: item.uid })
                }
              >
                Eliminar
              </button>
            </li>
          ))
        )}
      </ul>

      <Link to="/" className="btn btn-primary mt-3">
        Volver al inicio
      </Link>
    </div>
  );
};

export default Demo;