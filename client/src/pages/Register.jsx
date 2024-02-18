import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formInputs, setFormInputs] = useState({
    full_name: '',
    email: '',
    password: '',
    username: '',
    phone_number: '',
    address: '',
  });

  const onChange = (e) => {
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value });
  };

  const onFinish = async (values) => {
    try {
      console.log(values);
      const user = {
        full_name: values.full_name,
        email: values.email,
        password: values.password,
        username: values.username,
        phone_number: values.phone_number,
        address: values.address,
      };
      await register(user);
      console.log('User has been created successfully.');
      // navigate('/')
    } catch (error) {
      console.log('Error registering user: ', MediaError);
    }
  };

  const register = async () => {
    try {
      setLoading(true);

      const URL = import.meta.env.VITE_API_BASE_URL;

      const res = await fetch(`${URL}api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formInputs),
      });

      const data = await res.json();

      console.log(data);
    } catch (error) {
      console.log('Error registering user: ', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '100px',
      }}
    >
      <Form
        onFinish={() => onFinish(formInputs)}
        layout="vertical"
        style={{ width: '300px', textAlign: 'center' }}
      >
        <Form.Item
          name={'full_name'}
          label="User's Full Name"
          rules={[{ required: true, whitespace: true }]}
          hasFeedback
        >
          <Input
            placeholder="Enter your full name"
            value={formInputs.full_name}
            onChange={onChange}
            name="full_name"
          />
        </Form.Item>

        <Form.Item
          name={'email'}
          label="User's Email"
          rules={[{ required: true }]}
          hasFeedback
        >
          <Input
            placeholder="Enter your email"
            value={formInputs.email}
            onChange={onChange}
            name="email"
          />
        </Form.Item>

        <Form.Item
          name={'password'}
          label="User's Password"
          rules={[{ required: true }]}
          hasFeedback
        >
          <Input
            type="password"
            placeholder="Enter your password"
            value={formInputs.password}
            onChange={onChange}
            name="password"
          />
        </Form.Item>

        <Form.Item
          name={'username'}
          label="User's Username"
          rules={[{ required: true }]}
          hasFeedback
        >
          <Input
            placeholder="Enter your username"
            value={formInputs.username}
            onChange={onChange}
            name="username"
          />
        </Form.Item>

        <Form.Item
          name={'phone_number'}
          label="User's Phone Number"
          rules={[{ required: true }]}
          hasFeedback
        >
          <Input
            placeholder="Enter your phone number"
            value={formInputs.phone_number}
            onChange={onChange}
            name="phone_number"
          />
        </Form.Item>

        <Form.Item
          name={'address'}
          label="User's Address"
          rules={[{ required: true, whitespace: true }]}
          hasFeedback
        >
          <Input
            placeholder="Enter your address"
            value={formInputs.address}
            onChange={onChange}
            name="address"
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </Button>
      </Form>
    </div>
  );
};

export default Register;
