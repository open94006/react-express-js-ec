import { useEffect, useState } from 'react';
import { Counter } from './components/Counter';
import { VerifyTwoFactorToken } from './components/VerifyTwoFactorToken';
import { Base64Image } from './components/Base64Image';
import { ProductView } from './components/productList';
import { iProduct } from './types/iProduct';
import { Layout, ConfigProvider, theme, Button } from 'antd';
import { SunOutlined, MoonOutlined, MenuOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import { useMediaQuery } from 'react-responsive';

import MenuBar from './components/MenuBar/MenuBar';

const { Header, Content, Footer } = Layout;

function App() {
  const [twoFactorData, setTwoFactorData] = useState({ secret: '', image: '' });
  const [productListResp, setProductListResp] = useState({ data: [] });
  const [current, setCurrent] = useState('2fa');
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [collapsed, setCollapsed] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);

  // 新增主題狀態，初始值根據系統偏好
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
      setMenuVisible(false);
    } else {
      setCollapsed(false);
    }
  }, [isMobile]);

  // 二階段驗證資料
  useEffect(() => {
    setTimeout(() => {
      fetch('http://localhost:5100/api/twoFactor')
        .then(res => res.json())
        .then(data => setTwoFactorData(data));
    }, 1000);
  }, []);

  // 取得商品列表
  useEffect(() => {
    setTimeout(() => {
      fetch('http://localhost:5100/api/product/list')
        .then(res => res.json())
        .then(resp => setProductListResp(resp));
    }, 1000);
  }, []);

  const renderContent = () => {
    switch (current) {
      case '2fa':
        return (
          <>
            <Base64Image image={twoFactorData.image} />
            <VerifyTwoFactorToken secret={twoFactorData.secret} />
          </>
        );
      case 'counter':
        return <Counter />;
      case 'products':
        return productListResp.data.length > 0 ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {productListResp.data.map((product: iProduct) => (
              <ProductView
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                salePrice={product.salePrice}
              >
                {111}
              </ProductView>
            ))}
          </div>
        ) : (
          '載入中...'
        );
      default:
        return null;
    }
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: themeMode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Layout style={{ minHeight: '100vh', width: '100vw' }}>
        <MenuBar
          current={current}
          setCurrent={setCurrent}
          collapsed={collapsed}
          menuVisible={menuVisible}
          setMenuVisible={setMenuVisible}
          isMobile={isMobile}
          themeMode={themeMode}
        />
        <Layout>
          <Header
            style={{
              padding: 0,
              background: themeMode === 'dark' ? '#141414' : '#f0f2f5',
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => (isMobile ? setMenuVisible(!menuVisible) : setCollapsed(!collapsed))}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
                color: themeMode === 'dark' ? 'white' : 'black',
                zIndex: 1001,
              }}
            />
            {/* 新增切換主題按鈕 */}
            <Button
              type="text"
              onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
              style={{
                fontSize: '16px',
                marginLeft: 'auto',
                marginRight: 16,
                color: themeMode === 'dark' ? 'white' : 'black',
                zIndex: 1001,
                outline: 'none',
              }}
              tabIndex={-1}
              onFocus={e => e.currentTarget.blur()}
            >
              {themeMode === 'dark' ? <SunOutlined /> : <MoonOutlined />}
            </Button>
            <div
              onClick={() => setMenuVisible(false)}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 999,
                visibility: menuVisible && isMobile ? 'visible' : 'hidden',
                opacity: menuVisible && isMobile ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out, visibility 0.3s ease-in-out',
              }}
            />
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: themeMode === 'dark' ? '#141414' : '#fff',
                borderRadius: 8,
              }}
            >
              {renderContent()}
            </div>
          </Content>
          <Footer
            style={{
              textAlign: 'center',
              background: themeMode === 'dark' ? '#000' : '#f0f2f5',
              color: themeMode === 'dark' ? 'white' : 'black',
            }}
          >
            Ant Design ©{new Date().getFullYear()} Created by Roo
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
