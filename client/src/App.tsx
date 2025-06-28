import { useEffect, useState } from 'react';
import { Counter } from './components/Counter';
import { VerifyTwoFactorToken } from './components/VerifyTwoFactorToken';
import { Base64Image } from './components/Base64Image';
import { ProductView } from './components/productList';
import { iProduct } from './types/product';

function App() {
  const [twoFactorData, setTwoFactorData] = useState({ secret: '', image: '' });
  const [productListResp, setProductListResp] = useState({ data: [] });
  const [activeTab, setActiveTab] = useState('2fa'); // '2fa', 'counter', 'products'

  // 二階段驗證資料
  useEffect(() => {
    setTimeout(() => {
      fetch('http://localhost:5100/api/twoFactor')
        .then(res => {
          return res.json();
        })
        .then(data => {
          return setTwoFactorData(data);
        });
    }, 2000);
  }, []);

  // 取得商品列表
  useEffect(() => {
    setTimeout(() => {
      fetch('http://localhost:5100/api/product/list')
        .then(res => {
          return res.json();
        })
        .then(resp => {
          return setProductListResp(resp);
        });
    }, 2000);
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
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
          <>
            {productListResp.data.map((product: iProduct) => (
              <ProductView key={product.id} id={product.id} name={product.name} salePrice={product.salePrice}>
                {111}
              </ProductView>
            ))}
          </>
        ) : (
          '載入中...'
        );
      default:
        return null;
    }
  };

  const tabs = [
    { id: '2fa', label: '2FA 驗證' },
    { id: 'counter', label: '計數器' },
    { id: 'products', label: '產品列表' },
  ];

  return (
    <div style={{ width: '100%' }}>
      <h1>React + Express + TS</h1>
      <div className="tab-nav">
        {tabs.map(tab => (
          <button key={tab.id} className={activeTab === tab.id ? 'active' : ''} onClick={() => setActiveTab(tab.id)}>
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content">{renderTabContent()}</div>
    </div>
  );
}

export default App;
