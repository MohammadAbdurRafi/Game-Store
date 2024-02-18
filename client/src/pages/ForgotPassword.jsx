import { Form, Input, Button } from 'antd';

const ForgotPassword = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '250px',
      }}
    >
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
