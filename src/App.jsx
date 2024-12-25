import React from "react";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [beers, setBeers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://api.sampleapis.com/beers/ale")
      .then((response) => response.json())
      .then((data) => setBeers(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredBeers = beers.filter((beer) =>
    beer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <div className="app">
        <header className="header">
          <h1>Get Your Favourite Beer...</h1>
          <input
            type="text"
            placeholder="Search beers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />
        </header>
        <div className="beer-list">
          {filteredBeers.map((beer) => (
            <div key={beer.id} className="beer-card">
              <img src={beer.image} alt={beer.name} className="beer-image" />
              <h2>{beer.name}</h2>
              <p>{beer.style}</p>
              <p>ABV: {beer.abv ? beer.abv : "N/A"}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
