import React from 'react';
import { Layout, Menu } from 'antd';
import { SafetyCertificateOutlined, FieldNumberOutlined, AppstoreOutlined } from '@ant-design/icons';

const { Sider } = Layout;

interface MenuBarProps {
  current: string;
  setCurrent: (key: string) => void;
  collapsed: boolean;
  menuVisible: boolean;
  setMenuVisible: (visible: boolean) => void;
  isMobile: boolean;
  themeMode: 'light' | 'dark';
}

const MenuBar: React.FC<MenuBarProps> = ({
  current,
  setCurrent,
  collapsed,
  menuVisible,
  setMenuVisible,
  isMobile,
  themeMode,
}) => {
  const menuItems = [
    { key: '2fa', icon: <SafetyCertificateOutlined />, label: '2FA 驗證' },
    { key: 'counter', icon: <FieldNumberOutlined />, label: '計數器' },
    { key: 'products', icon: <AppstoreOutlined />, label: '產品列表' },
  ];

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={isMobile ? false : collapsed}
      width={isMobile ? '85%' : 200}
      collapsedWidth={80}
      style={{
        position: isMobile ? 'fixed' : 'relative',
        zIndex: 1000,
        height: '100vh',
        transition: 'transform 0.3s ease-in-out, width 0.3s ease-in-out',
        transform: isMobile ? (menuVisible ? 'translateX(0)' : 'translateX(-100%)') : 'translateX(0)',
        overflow: 'hidden',
        background: themeMode === 'dark' ? '#001529' : '#f0f2f5',
      }}
    >
      <div
        style={{
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src="/vite.svg"
          alt="logo"
          style={{
            height: 32,
            width: 32,
            transition: 'opacity 0.2s ease-in-out',
            opacity: collapsed && !isMobile ? 0 : 1,
          }}
        />
      </div>
      <Menu
        theme={themeMode === 'dark' ? 'dark' : 'light'}
        selectedKeys={[current]}
        mode="inline"
        inlineCollapsed={isMobile ? false : collapsed}
        items={menuItems}
        onClick={e => {
          setCurrent(e.key);
          if (isMobile) {
            setMenuVisible(false);
          }
        }}
      />
    </Sider>
  );
};

export default MenuBar;
