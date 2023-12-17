import { useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar';

const App = () => {
  const URL = 'http://localhost:8000/api/games/';
  const [games, setGames] = useState([]);

  const fetchGame = async (id) => {
    const res = await fetch(`${URL}${id}`);
    const data = await res.json();
    return data;
  };

  const deleteGame = async (id) => {
    await fetch(`${URL}${id}`, {
      method: 'DELETE',
    });
    setGames(games.filter((game) => game.id !== id));
  };

  const updateGame = async (id) => {
    const game = await fetchGame(id);
    const res = fetch(`${URL}${id}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(),
    });
  };

  return (
    <>
      <Navbar />
    </>
  );
};

export default App;
