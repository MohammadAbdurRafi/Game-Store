import { useState, useEffect } from 'react';
import { Card, Col, Row, Image } from 'antd';
const { Meta } = Card;

const Home = () => {
  const URL = 'http://localhost:8000/api/games/';
  const [games, setGames] = useState([]);

  useEffect(() => {
    const getGames = async () => {
      const gamesFromServer = await fetchGames();
      setGames(gamesFromServer);
      console.log(games);
    };

    getGames();
  }, []);

  const fetchGames = async () => {
    const res = await fetch(URL);
    const data = await res.json();
    return data;
  };
  return (
    <>
      <Row gutter={16} style={{ marginLeft: '40px', marginRight: '40px' }}>
        {games.map((game) => (
          <Col key={game.id} span={4}>
            <Card
              style={{ textAlign: 'center' }}
              hoverable
              cover={<Image src={game.picture} />}
            >
              <Meta description={game.description} title={game.name} />
              <p>${game.price}</p>
              <p>
                {game.isActive
                  ? 'The game is actively being supported'
                  : "The game isn't being supported anymore."}
              </p>
              <p>{game.quantity} units are available for purchase</p>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Home;
