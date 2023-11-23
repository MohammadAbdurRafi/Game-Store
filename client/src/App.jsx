import Header from './components/Header';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const URL = 'http://localhost:8000/api/games/';
  const [games, setGames] = useState([]);

  useEffect(() => {
    const getGames = async () => {
      const gamesFromServer = await fetchGames();
      setGames(gamesFromServer);
    };

    getGames();
  }, []);

  const fetchGames = async () => {
    const res = await fetch(URL);
    const data = await res.json();
    console.log(data);
    return data;
  };

  const fetchGame = async (id) => {
    const res = await fetch(`${URL}${id}`);
    const data = await res.json();
    return data;
  };

  const addGame = async (game) => {
    const res = await fetch(`${URL}add`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(game),
    });
    const data = await res.json();

    setGames([...games, game]);
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

  return <Header />;
};

export default App;
