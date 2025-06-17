import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const { store } = useGlobalReducer();

  const allItems = [
    ...store.people.map(p => ({ ...p, type: "people" })),
    ...store.planets.map(p => ({ ...p, type: "planets" })),
    ...store.vehicles.map(p => ({ ...p, type: "vehicles" }))
  ];

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length >= 2) {
      const filtered = allItems.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 6)); // máximo 6 sugerencias
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (item) => {
    setQuery("");
    setSuggestions([]);
    navigate(`/${item.type}/${item.uid}`);
  };

  return (
    <div className="position-relative w-100">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar personaje, planeta o vehículo..."
        value={query}
        onChange={handleChange}
      />
      {suggestions.length > 0 && (
        <ul className="list-group position-absolute w-100 z-3" style={{ top: "100%", maxHeight: "200px", overflowY: "auto" }}>
          {suggestions.map((item, idx) => (
            <li
              key={idx}
              className="list-group-item list-group-item-action"
              onClick={() => handleSelect(item)}
              style={{ cursor: "pointer" }}
            >
              {item.name} <small className="text-muted">({item.type})</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;