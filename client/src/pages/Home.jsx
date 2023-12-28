import { useState, useEffect } from 'react';
import { Card, Col, Row, Image, Button, Space, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Meta } = Card;
const { Text } = Typography;

const Home = () => {
  const URL = 'http://localhost:8000/api/games/';
  const [games, setGames] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getGames = async () => {
      let gamesFromServer = await fetchGames();
      console.log(gamesFromServer);
      setGames(
        gamesFromServer.map((g) => ({
          id: g.id,
          name: g.name,
          description: g.description,
          picture: g.picture,
          price: g.price,
          isActive: g.isActive,
          quantity: g.quantity,
        }))
      );
    };

    getGames();
  }, []);

  const fetchGames = async () => {
    const res = await fetch(URL);
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
    const res = await fetch(`${URL}${id}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(game),
    });
    const data = await res.json();
    console.log(data);
  };

  const handleEditClick = (gameId) => {
    navigate(`/edit/${gameId}`);
  };

  return (
    <>
      <Row gutter={16}>
        {games.map((game) => (
          <Col key={game.id} span={3}>
            <Card
              style={{ textAlign: 'center', paddingTop: '5px' }}
              hoverable
              cover={
                <div
                  style={{
                    display: 'flex',
                    height: '200px',
                  }}
                >
                  <Image
                    height={'100%'}
                    width={'100%'}
                    style={{ objectFit: 'cover' }}
                    src={`${import.meta.env.VITE_API_BASE_URL}${game.picture}`}
                  />
                </div>
              }
            >
              <Meta
                description={<Text ellipsis>{game.description}</Text>}
                title={<Text ellipsis>{game.name}</Text>}
              />
              <p>${game.price}</p>
              <p>
                {game.isActive
                  ? 'The game is actively being supported'
                  : "The game isn't being supported anymore."}
              </p>
              <p>{game.quantity} units are available for purchase</p>
              <Space>
                <Button type="primary" onClick={() => handleEditClick(game.id)}>
                  Edit
                </Button>
                <Button
                  type="primary"
                  onClick={() => deleteGame(game.id)}
                  style={{ backgroundColor: 'red', color: 'white' }}
                >
                  Delete
                </Button>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Home;
