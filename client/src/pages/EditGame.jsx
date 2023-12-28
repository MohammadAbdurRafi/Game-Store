import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Select } from 'antd';
const { TextArea } = Input;

const EditGame = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [game, setGame] = useState({});
  const [form] = Form.useForm();
  const fileRef = useRef(null);
  const URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        setLoading(true);
        const gameData = await fetchGame(id);
        setGame(gameData);

        form.setFieldsValue({
          name: gameData.name,
          price: gameData.price,
          isActive: gameData.isActive,
          quantity: gameData.quantity,
          description: gameData.description,
        });
      } catch (error) {
        console.error('Error fetching game details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [id, form]);

  const fetchGame = async (id) => {
    const res = await fetch(`${URL}api/games/${id}`);
    const data = await res.json();
    return data;
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('price', values.price);
      formData.append('isActive', values.isActive);
      formData.append('quantity', values.quantity);
      formData.append('description', values.description);

      // Handle file input
      if (fileRef.current && fileRef.current.files.length > 0) {
        formData.append('picture', fileRef.current.files[0]);
      }

      await updateGame(id, formData);

      // Redirect the user back to the game details page after updating
      navigate('/');
    } catch (error) {
      console.error('Error updating game details:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateGame = async (id, formData) => {
    try {
      const res = await fetch(`${URL}api/games/edit/${id}`, {
        method: 'PUT',
        body: formData,
      });

      const data = await res.json();
      console.log(data);
      return data; // You might want to return the updated data or handle it as needed
    } catch (error) {
      console.error('Error updating game:', error);
      throw error; // You might want to handle errors appropriately
    }
  };
  return (
    <div>
      <Form
        form={form}
        style={{ textAlign: 'center' }}
        onFinish={onFinish}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <h1>Edit Game</h1>

        <Form.Item
          label="Game's Name"
          name="name"
          rules={[
            { required: true, message: "Please enter the game's name" },
            { max: 255, message: 'Name cannot exceed 255 characters' },
          ]}
        >
          <Input placeholder="Enter the game's name" />
        </Form.Item>

        <Form.Item
          label="Game's Price"
          name="price"
          rules={[{ required: true, message: "Please enter the game's price" }]}
        >
          <Input
            type="number"
            step={'0.01'}
            min={'0'}
            placeholder="Enter the game's price"
          />
        </Form.Item>

        <Form.Item
          label="Game's Active Status"
          name="isActive"
          rules={[
            {
              required: true,
              message: "Please select the game's active status",
            },
          ]}
        >
          <Select>
            <Select.Option value={true}>
              {"Yes, the game's active"}
            </Select.Option>
            <Select.Option value={false}>
              {"No, the game's not active"}
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Game's Quantity"
          name="quantity"
          rules={[
            { required: true, message: "Please enter the game's quantity" },
          ]}
        >
          <Input
            type="number"
            step={'1'}
            min={'0'}
            placeholder="Enter the game's quantity"
          />
        </Form.Item>

        <Form.Item
          label="Game's Description"
          name="description"
          rules={[
            { required: true, message: "Please enter the game's description" },
            { max: 1000, message: 'Description cannot exceed 1000 characters' },
          ]}
        >
          <TextArea placeholder="Enter the game's description" />
        </Form.Item>

        <Form.Item label="Game's Picture" name="picture">
          <input type="file" ref={fileRef} accept="image/*" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Update Game
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditGame;
