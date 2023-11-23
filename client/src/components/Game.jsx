import Card from 'react-bootstrap/Card';
const Game = (game) => {
  return (
    <Card style={{ cursor: 'pointer' }}>
      <Card.Img variant="top" src={game.picture} />
      <Card.Body>
        <Card.Title>{game.name}</Card.Title>
        <Card.Text>{game.description}</Card.Text>
        <Card.Text>{game.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Game;
