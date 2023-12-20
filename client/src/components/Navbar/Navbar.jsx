import { Menu, Layout, Dropdown, Space } from 'antd';
import {
  HomeOutlined,
  PlusOutlined,
  UserOutlined,
  CodeOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
const { Header } = Layout;
import { Link, Routes, Route } from 'react-router-dom';
import AddGame from '../../pages/AddGame';
import Home from '../../pages/Home';
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
    label: <Link to="/add">Add Game</Link>,
    key: 'add_game',
    icon: <PlusOutlined />,
  },
  // {
  //   label: (
  //     <Dropdown menu={{ dropdownItems }}>
  //       <a onClick={(e) => e.preventDefault()}>
  //         <Space>
  //           <UserOutlined />
  //         </Space>
  //       </a>
  //     </Dropdown>
  //   ),
  //   key: 'dropdown',
  // },
];

const Navbar = () => {
  return (
    <>
      <Layout>
        <Header className="header">
          <div>
            <Menu
              style={{ justifyContent: 'flex-start' }}
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              items={menuItems}
            ></Menu>
          </div>
        </Header>
      </Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddGame />} />
      </Routes>
    </>
  );
};

export default Navbar;
