import { useState } from 'react';
import { Button, Space, List } from 'antd';

export const Counter = () => {
  const [count, setCount] = useState(0);
  const [records, setRecords] = useState<number[]>([]);

  // 增加或減少指定數值
  const changeCount = (delta: number) => {
    setCount(prev => prev + delta);
  };

  // 歸零
  const resetCount = () => {
    setCount(0);
  };

  // 存取當前計數到紀錄
  const saveRecord = () => {
    setRecords(prev => [...prev, count]);
  };

  // 清除所有紀錄
  const clearRecords = () => {
    setRecords([]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <Space>
        <Button onClick={() => changeCount(-5)}>-5</Button>
        <Button onClick={() => changeCount(-1)}>-1</Button>
        <h2 style={{ margin: '0 12px' }}>{count}</h2>
        <Button onClick={() => changeCount(1)}>+1</Button>
        <Button onClick={() => changeCount(5)}>+5</Button>
      </Space>
      <Space>
        <Button onClick={resetCount}>歸零</Button>
        <Button onClick={saveRecord}>存紀錄</Button>
        <Button onClick={clearRecords} danger>
          清除紀錄
        </Button>
      </Space>
      <List
        size="small"
        header={<div>計數紀錄</div>}
        bordered
        dataSource={records}
        renderItem={(item, index) => <List.Item>{`紀錄 ${index + 1}: ${item}`}</List.Item>}
        style={{ width: 200 }}
      />
    </div>
  );
};
