import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Select } from 'antd';
const { TextArea } = Input;

const AddGame = () => {
  const fileRef = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formInputs, setFormInputs] = useState({
    name: '',
    description: '',
    picture: null,
    price: 0,
    is_active: 1,
    quantity: 0,
  });
  const onChange = (e) => {
    if (e.target.type === 'file') {
      setFormInputs({
        ...formInputs,
        picture: e.target.files[0] || null,
      });
      fileRef.current = e.target.files[0];
    } else {
      setFormInputs({ ...formInputs, [e.target.name]: e.target.value });
    }
  };
  const onFinish = async (values) => {
    try {
      console.log(values);
      const obj = {
        name: values.name,
        picture: values.picture,
        description: values.description,
        is_active: values.is_active.value,
        price: values.price,
        quantity: values.quantity,
      };
      await addGame(obj);
      console.log('Game added successfully');
      navigate('/');
    } catch (error) {
      console.error('Error adding game:', error);
    }
  };
  const addGame = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('name', formInputs.name);
      formData.append('price', formInputs.price);
      formData.append('description', formInputs.description);
      formData.append('quantity', formInputs.quantity);
      formData.append('is_active', formInputs.is_active.value);
      formData.append('picture', formInputs.picture);

      console.log(fileRef.current);
      console.log(formInputs);

      const URL = import.meta.env.VITE_API_BASE_URL;

      const res = await fetch(`${URL}api/games/add`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error('Error adding game: ', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'block', textAlign: 'center' }}>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          name="name"
          label="Game's Name"
          rules={[{ required: true, whitespace: true }]}
          hasFeedback
        >
          <Input
            placeholder="Enter your game's name"
            value={formInputs.name}
            onChange={onChange}
            name="name"
          />
        </Form.Item>

        <Form.Item
          name="price"
          label="Game's Price"
          rules={[{ required: true }]}
          hasFeedback
        >
          <Input
            type="number"
            placeholder="Enter your game's price"
            value={formInputs.price}
            onChange={onChange}
            name="price"
            step="0.01"
            min="0"
          />
        </Form.Item>

        <Form.Item
          name="picture"
          label="Game's Picture"
          rules={[{ required: true }]}
          hasFeedback
        >
          <Input
            type="file"
            placeholder="Enter your game's picture"
            value={formInputs.picture}
            onChange={onChange}
            ref={fileRef.current}
            name="picture"
          />
        </Form.Item>

        <Form.Item
          name="is_active"
          label="Game's Active Status"
          rules={[
            {
              required: true,
            },
          ]}
          hasFeedback
        >
          <Select
            labelInValue
            onChange={(value) =>
              onChange({ target: { name: 'is_active', value } })
            }
            value={formInputs.is_active}
            options={[
              { value: true, label: "Yes, the game's active" },
              { value: false, label: "No, the game's not active" },
            ]}
          />
        </Form.Item>

        <Form.Item
          name="quantity"
          label="Game's Quantity"
          rules={[{ required: true }]}
          hasFeedback
        >
          <Input
            type="number"
            placeholder="Enter your game's quantity"
            value={formInputs.quantity}
            onChange={onChange}
            name="quantity"
            step="1"
            min="0"
          />
        </Form.Item>

        <Form.Item
          name="description"
          label="Game's Description"
          rules={[{ required: true }]}
          hasFeedback
        >
          <TextArea
            placeholder="Enter your game's description"
            value={formInputs.description}
            onChange={onChange}
            name="description"
          />
        </Form.Item>

        <Form.Item style={{ textAlign: 'center' }}>
          <Button type="primary" htmlType="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Game'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddGame;
