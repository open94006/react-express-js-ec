import { useState } from 'react';
import { Input, Button } from 'antd';

export const VerifyTwoFactorToken = ({ secret }: { secret: string }) => {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setResult('');
    try {
      const res = await fetch('http://localhost:5100/api/twoFactor/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ secret, token: inputValue }),
      });
      const data = await res.json();
      if (data.success) {
        setResult('驗證成功');
      } else {
        setError('驗證失敗');
      }
    } catch (err) {
      console.error(err);
      setError('發生錯誤');
    }
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', marginTop: '24px' }}>
      <Input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={6}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value.replace(/\D/g, ''))}
        placeholder="請輸入驗證碼"
        disabled={loading}
        style={{ width: 200, textAlign: 'center' }}
      />
      <Button onClick={handleSubmit} disabled={!inputValue || loading} style={{ marginTop: 8 }}>
        {loading ? '送出中...' : '送出'}
      </Button>
      {result && <div style={{ color: 'green' }}>{result}</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};
