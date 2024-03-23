import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Typography, message } from 'antd';
import { post } from '../api/services';
import { AuthContext } from '../context/auth';
import { useForm } from 'antd/es/form/Form';
const { Title } = Typography;

const Login = () => {
  const [form] = useForm();
  const context = useContext(AuthContext);
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
    console.log('Success:', values);
    try {
      const response = await post('/api/users/login', values);
      if (response?.token) {
        form.resetFields();
        message.success('Logged in successfully');
        localStorage.setItem('user', JSON.stringify(response));
        console.log(response);
        context.login(response);
        window.location.href = '/';
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed,', errorInfo);
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
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: '250px',
        alignItems: 'center',
      }}
    >
      <Title>Log In</Title>
      <Form
        form={form}
        onFinish={() => {
          onFinish(formInputs);
        }}
        onFinishFailed={onFinishFailed}
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
