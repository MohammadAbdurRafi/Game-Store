import { Menu, Layout } from 'antd';
import {
  HomeOutlined,
  PlusOutlined,
  UserOutlined,
  CodeOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
const { Header } = Layout;
import { Link } from 'react-router-dom';
import './Navbar.css';

const dropdownItems = [
  {
    key: 'projects',
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https//:www.google.com"
      >
        Projects
      </a>
    ),
    icon: <CodeOutlined />,
  },
  {
    key: 'profile',
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https//:www.google.com"
      >
        Profile
      </a>
    ),
    icon: <UserOutlined />,
  },
  {
    key: 'logout',
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https//:www.google.com"
      >
        Logout
      </a>
    ),
    icon: <LogoutOutlined />,
  },
];

const menuItems = [
  {
    label: <Link to="/">Home</Link>,
    key: 'home',
    icon: <HomeOutlined />,
  },
  {
    label: <Link to="/game/add">Add Game</Link>,
    key: 'add_game',
    icon: <PlusOutlined />,
  },
  {
    label: <Link to="/user/register">Register</Link>,
    key: 'register',
    icon: <HomeOutlined />,
  },
  {
    label: <Link to="/user/login">Login</Link>,
    key: 'login',
    icon: <PlusOutlined />,
  },
];

const Navbar = () => {
  return (
    <>
      <Layout>
        <Header className="header">
          <div>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              items={menuItems}
            ></Menu>
          </div>
        </Header>
      </Layout>
    </>
  );
};

export default Navbar;
