import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formInputs, setFormInputs] = useState({
    email: '',
    password: '',
  });

  const onChange = (e) => {
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value });
  };

  const onFinish = async (values) => {
    try {
      console.log(values);
      const userLogin = {
        email: values.email,
        password: values.password,
      };
      await login(userLogin);
      console.log('User has been successfully logged in.');
      // navigate('/')
    } catch (error) {
      console.log('Error logging user in: ', error);
    }
  };

  const login = async () => {
    try {
      setLoading(true);

      const URL = import.meta.env.VITE_API_BASE_URL;

      const res = await fetch(`${URL}api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formInputs),
      });

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log('Error logging user in: ', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '250px',
      }}
    >
      <Form
        onFinish={() => {
          onFinish(formInputs);
        }}
        style={{ textAlign: 'center', width: '300px' }}
        layout="vertical"
      >
        <Form.Item
          name={'email'}
          label="User's email"
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
          label="User's password"
          rules={[{ required: true }]}
          hasFeedback
        >
          <Input
            placeholder="Enter your password"
            value={formInputs.password}
            onChange={onChange}
            name="password"
          />
        </Form.Item>

        <Link to="/forgot-password">Forgot Password</Link>

        <br />

        <Button
          type="primary"
          htmlType="submit"
          disabled={loading}
          style={{ marginTop: '10px' }}
        >
          {loading ? 'Logging In...' : 'Login'}
        </Button>
      </Form>
    </div>
  );
};

export default Login;
