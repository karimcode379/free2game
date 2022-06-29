import './App.scss';

import { Route, Routes, Navigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';

import All from "./pages/All";
import GameDetail from "./pages/GameDetail";
import Recently from "./pages/Recently";
import Home from "./pages/Home"
import Refresher from './pages/Refresher';
import SearchBar from './components/SearchBar';

import NavBar from './components/NavBar';

function App() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      }
    };
    const getDataHandler = () => {
      fetch('https://free-to-play-games-database.p.rapidapi.com/api/games', options)
        .then(response => response.json())
        .then(json => {
          setData(json);
        })
        .catch(err => console.error(err));
    }
    getDataHandler();
  }, []);

  return (
    <div className="App">
      <NavBar />
      <SearchBar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/all" element={<All data={data} />} />
        <Route path="/gamedetail/:id" element={<GameDetail />} />
        <Route path="/refresher" element={<Refresher />} />
        <Route path="/recently" element={<Recently data={data} />} />
      </Routes>
    </div>
  );
}

export default App;
