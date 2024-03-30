import { useContext } from 'react';
import { Menu, Layout, Button } from 'antd';
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
import { AuthContext } from '../../context/auth';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const getItem = (label, key, icon, children, type) => {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem('user');
  };

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
    user?.token === null ||
      (user?.token === undefined &&
        ({
          label: <Link to="/user/register">Register</Link>,
          key: 'register',
          icon: <HomeOutlined />,
        },
        {
          label: <Link to="/user/login">Login</Link>,
          key: 'login',
          icon: <PlusOutlined />,
        })),
    {
      label: <Link to="/users">Users</Link>,
      key: 'users',
      icon: <PlusOutlined />,
    },
    user?.token &&
      getItem(
        <Link style={{ color: 'white' }} to="/">
          {user?.full_name}
        </Link>,
        'user',
        <UserOutlined />,
        [
          getItem(
            <Button
              style={{
                backgroundColor: '#001529',
                color: 'white',
                width: '100%',
              }}
              onClick={handleLogout}
            >
              Logout
            </Button>,
            'logout'
          ),
        ]
      ),
  ];
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
