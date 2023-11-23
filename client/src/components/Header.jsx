import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const Header = ({ user }) => {
  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container style={{ justifyContent: 'space-between' }}>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/game_store_logo.jpg"
              width="75"
              height="75"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Form style={{ width: '90%' }}>
            <Row>
              <Col className="col-8">
                <Form.Control
                  type="text"
                  placeholder="Enter the game you're looking for"
                />
              </Col>
              <Col>
                <Button type="submit">Search</Button>
              </Col>
              <Col>
                <Button>Sign Up</Button>
              </Col>
              <Col>
                <Button>Cart</Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
