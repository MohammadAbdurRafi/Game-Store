// EditGame.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Input, Button, Select } from 'antd';
const { TextArea } = Input;

const EditGame = () => {
  const { id } = useParams(); // Retrieve the game ID from the route params
  console.log(id);

  const [loading, setLoading] = useState(false);
  const [game, setGame] = useState({});
  const [formInputs, setFormInputs] = useState({});

  const fetchGame = async (id) => {
    const res = await fetch(`${URL}${id}`);
    const data = await res.json();
    return data;
  };

  const onFinish = async (values) => {
    // Implement logic to update the game details
    // ...
    // Redirect the user back to the game details page after updating
    // You can use the `useNavigate` hook or another navigation method
  };

  // Render a form similar to the one in AddGame.js but pre-filled with existing data

  // ...

  return (
    <div>
      <h1>Edit Game</h1>
      {/* Render the form for editing game details */}
      <Form onFinish={onFinish}>
        {/* ... Form items for editing game details ... */}
        <Form.Item style={{ textAlign: 'center' }}>
          <Button type="primary" htmlType="submit">
            Update Game
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditGame;
