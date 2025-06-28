import { Fragment, ReactNode, useEffect, useState } from 'react';

type iProduct = {
  id: number;
  name: string;
  salePrice: number;
  children?: ReactNode;
};

function App() {
  // const [message, setMessage] = useState('載入中');
  const [twoFactorData, setTwoFactorData] = useState({ secret: '', image: '' });
  const [count, setCount] = useState(0);

  // 可以看到兩秒鐘後從「載入中」變化成後端回傳的文字
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

  const ExampleDiv = ({ id, name, salePrice, children }: iProduct) => {
    return (
      <Fragment>
        <h2 onClick={() => console.log(children)}>{name}</h2>
        <div>
          {id}, ${salePrice}
        </div>
      </Fragment>
    );
  };

  const AddButton = () => {
    return (
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +
      </button>
    );
  };

  const MiunsButton = () => {
    return (
      <button
        onClick={() => {
          setCount(count - 1);
        }}
      >
        {' '}
        -
      </button>
    );
  };

  const VerifyTwoFactorToken = () => {
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
      setLoading(true);
      setResult(null);
      setError(null);
      try {
        const res = await fetch('http://localhost:5100/api/twoFactor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userToken: inputValue,
            secret: twoFactorData.secret,
          }),
        });
        const data = await res.json();
        setResult(data?.message || '驗證完成');
      } catch (error) {
        console.error('驗證失敗:', error);
        setError('驗證失敗，請稍後再試');
      } finally {
        setLoading(false);
      }
    };

    return (
      <Fragment>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={6}
          value={inputValue}
          onChange={e => setInputValue(e.target.value.replace(/\D/g, ''))}
          placeholder="請輸入驗證碼"
          disabled={loading}
        />
        <button onClick={handleSubmit} disabled={!inputValue || loading}>
          {loading ? '送出中...' : '送出'}
        </button>
        {result && <div style={{ color: 'green' }}>{result}</div>}
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </Fragment>
    );
  };

  const Base64Image = ({ data }: { data: { image: string } }) => {
    console.log(data);
    if (!data.image) {
      return <div>載入中</div>;
    }
    return (
      <div>
        <img src={data.image} alt="Base64 Image" />
      </div>
    );
  };

  const productList: iProduct[] = [
    // { id: 1, name: '牛奶', salePrice: 130 },
    // { id: 2, name: '白豆漿', salePrice: 50 },
    // { id: 3, name: '黑豆漿', salePrice: 70 },
    // { id: 4, name: '汽水', salePrice: 40 },
  ];

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>React + Express + TS</h1>
      {productList.map(product => {
        const { id, name, salePrice } = product;
        return (
          <ExampleDiv id={id} name={name} salePrice={salePrice}>
            {111}
          </ExampleDiv>
        );
      })}
      <Base64Image data={twoFactorData} />
      <VerifyTwoFactorToken />
      <AddButton />
      <h2>{count}</h2>
      <MiunsButton />
    </div>
  );
}

export default App;
