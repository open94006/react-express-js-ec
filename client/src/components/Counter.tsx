import { useState } from 'react';
import { Button } from 'antd';

export const Counter = () => {
  const [count, setCount] = useState(0);

  const AddButton = () => {
    return (
      <Button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +
      </Button>
    );
  };

  const MiunsButton = () => {
    return <Button onClick={() => setCount(count - 1)}> -</Button>;
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: '12px',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <AddButton />
      <h2>{count}</h2>
      <MiunsButton />
    </div>
  );
};
