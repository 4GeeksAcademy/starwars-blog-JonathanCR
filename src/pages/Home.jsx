import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import Card from "../components/Card";

const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const { people = [], planets = [], vehicles = [] } = store;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoints = [
          { type: "people", url: "https://www.swapi.tech/api/people" },
          { type: "planets", url: "https://www.swapi.tech/api/planets" },
          { type: "vehicles", url: "https://www.swapi.tech/api/vehicles" }
        ];

        for (const endpoint of endpoints) {
          const res = await fetch(endpoint.url);
          const data = await res.json();
          dispatch({
            type: `SET_${endpoint.type.toUpperCase()}`,
            payload: data.results
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="container my-5">
      <h1 className="text-danger fw-bold my-5" style={{ fontSize: "2.5rem" }}>Personajes</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {people.map((person) => (
          <Card key={person.uid} item={person} type="people" />
        ))}
      </div>

      <h1 className="text-danger fw-bold my-5" style={{ fontSize: "2.5rem" }}>Planetas</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {planets.map((planet) => (
          <Card key={planet.uid} item={planet} type="planets" />
        ))}
      </div>

      <h1 className="text-danger fw-bold my-5" style={{ fontSize: "2.5rem" }}>Vehículos</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {vehicles.map((vehicle) => (
          <Card key={vehicle.uid} item={vehicle} type="vehicles" />
        ))}
      </div>
    </div>
  );
};

export default Home;