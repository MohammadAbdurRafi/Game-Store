import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Col, Row, Typography, Button, Input } from 'antd';
const { Meta } = Card;
const { Text } = Typography;
const { Search } = Input;

const Users = () => {
  const URL = 'http://localhost:8000/api/users/';
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      let usersFromServer = await fetchUsers();
      setUsers(
        usersFromServer.map((u) => ({
          id: u.id,
          full_name: u.full_name,
          email: u.email,
          password: u.password,
          username: u.username,
          role: u.role,
          phone_number: u.phone_number,
          address: u.address,
          is_active: u.is_active,
        }))
      );
    };

    getUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch(URL);
    const data = await res.json();
    return data;
  };

  const deleteUser = async (id) => {
    await fetch(`${URL}${id}`, {
      method: 'DELETE',
    });
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.full_name.toLowerCase().includes(searchQuery.toLowerCase())
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
          placeholder="Search users"
          allowClear
          enterButton="Search"
          size="large"
          onChange={handleSearch}
          style={{ width: 1000, marginBottom: 16 }}
        />
      </div>
      <Row gutter={16} style={{ marginLeft: 10, marginRight: 10 }}>
        {filteredUsers.map((user) => (
          <Col key={user.id} span={8}>
            <Card
              style={{ textAlign: 'center', paddingTop: '5px' }}
              bordered
              hoverable
            >
              <Meta title={<Text>Name: {user.full_name}</Text>} />
              <p>Email: {user.email}</p>
              <p>Username: {user.username}</p>
              <p>Role: {user.role}</p>
              <p>Phone Number: {user.phone_number}</p>
              <p>Address: {user.address}</p>
              <p>
                {user.is_active
                  ? "This user's account is active"
                  : "This user's account is inactive"}
              </p>
              <Button
                type="primary"
                onClick={() => deleteUser(user.id)}
                style={{ backgroundColor: 'red', color: 'white' }}
              >
                Delete
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Users;
