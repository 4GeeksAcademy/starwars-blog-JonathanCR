import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const Single = () => {
  const { type, uid } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://www.swapi.tech/api/${type}/${uid}`);
        const json = await res.json();
        setData(json.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, uid]);

  if (loading) return <div className="text-center mt-5">Cargando...</div>;
  if (!data) return <div className="text-center mt-5">No se encontró información.</div>;

  const { properties } = data;
  const imageUrl = `https://swapi.tech/api/${type === "people" ? "characters" : type}/${uid}.jpg`;

  // Traducciones simples
  const translate = (value) => {
    const map = {
      male: "masculino",
      female: "femenino",
      "n/a": "no aplica",
      none: "ninguno",
      sentient: "sensible",
      unknown: "desconocido",
      fair: "clara",
      golden: "dorado",
      white: "blanco",
      blue: "azul",
      red: "rojo",
      yellow: "amarillo",
      green: "verde",
      "artificial intelligence": "inteligencia artificial",
      "gas giant": "gigante gaseoso",
      "temperate": "templado",
      "frozen": "helado",
      "hot": "caluroso",
      "arid": "árido",
      "murky": "turbio"
    };

    return value && typeof value === "string"
      ? value
          .split(", ")
          .map((word) => map[word.toLowerCase()] || word)
          .join(", ")
      : value;
  };

  // Descripción personalizada por tipo
  const renderDescription = () => {
    switch (type) {
      case "people":
        return (
          <p className="text-muted">
            <strong>{properties.name}</strong> es un personaje del universo Star Wars, con una altura de {properties.height} cm y un peso de {properties.mass} kg. Nació en el año {properties.birth_year} y su género es {translate(properties.gender)}. Su color de piel es {translate(properties.skin_color)} y sus ojos son de color {translate(properties.eye_color)}.
          </p>
        );
      case "planets":
        return (
          <p className="text-muted">
            <strong>{properties.name}</strong> es un planeta con clima {translate(properties.climate)}, terreno {translate(properties.terrain)} y una población de {properties.population} habitantes. Su período de rotación es de {properties.rotation_period} horas.
          </p>
        );
      case "vehicles":
        return (
          <p className="text-muted">
            <strong>{properties.name}</strong> es un vehículo de tipo {translate(properties.vehicle_class)}, fabricado por {translate(properties.manufacturer)}. Puede alcanzar una velocidad máxima de {properties.max_atmosphering_speed} km/h y transportar hasta {properties.passengers} pasajeros.
          </p>
        );
      default:
        return <p className="text-muted">Descripción no disponible para este tipo de elemento.</p>;
    }
  };

  return (
    <div className="container my-5">
      <div className="row">
        {/* Imagen */}
        <div className="col-md-4 text-center">
          <img src={imageUrl} className="img-fluid rounded" alt={properties.name} />
        </div>

        {/* Descripción personalizada */}
        <div className="col-md-8">
          <h1 className="mb-4">{properties.name}</h1>
          {renderDescription()}
        </div>
      </div>

      {/* Lista de propiedades completas */}
      <div className="row mt-4">
        <div className="col">
          <ul className="list-group">
            {Object.entries(properties).map(([key, value]) => (
              <li key={key} className="list-group-item">
                <strong>{key}:</strong> {translate(value)}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Botón volver al inicio */}
      <div className="text-center mt-5">
        <Link to="/" className="btn btn-outline-primary">
          ← Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default Single;