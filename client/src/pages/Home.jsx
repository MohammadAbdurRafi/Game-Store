import { useState, useEffect } from 'react';
import { Card, Col, Row, Image, Button, Space, Typography, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Meta } = Card;
const { Text } = Typography;
const { Search } = Input;

const Home = () => {
  const URL = 'http://localhost:8000/api/games/';
  const [games, setGames] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getGames = async () => {
      let gamesFromServer = await fetchGames();
      setGames(
        gamesFromServer.map((g) => ({
          id: g.id,
          name: g.name,
          description: g.description,
          picture: g.picture,
          price: g.price,
          is_active: g.is_active,
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

  const handleEditClick = (gameId) => {
    navigate(`/edit/${gameId}`);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div
        style={{
          maxWidth: 'fit-content',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: 16,
        }}
      >
        <Search
          placeholder="Search games"
          allowClear
          enterButton="Search"
          size="large"
          onChange={handleSearch}
          style={{ width: 1000, marginBottom: 16 }}
        />
      </div>

      <Row gutter={16} style={{ marginLeft: 10, marginRight: 10 }}>
        {filteredGames.map((game) => (
          <Col key={game.id} span={3}>
            <Card
              style={{ textAlign: 'center', paddingTop: '5px' }}
              bordered
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
                {game.is_active
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
