import { Form, Input, Button, Typography } from 'antd';
const { Title } = Typography;

const ForgotPassword = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '250px',
      }}
    >
      <Title>Forgot Password</Title>
      <Form style={{ textAlign: 'center' }} layout="vertical">
        <Form.Item label="Email" name="email">
          <Input placeholder="Email"></Input>
        </Form.Item>
        <Form.Item name="submit">
          <Button type="primary">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ForgotPassword;
