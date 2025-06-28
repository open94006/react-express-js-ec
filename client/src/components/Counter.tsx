import { useState } from 'react';

export const Counter = () => {
  const [count, setCount] = useState(0);

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
    return <button onClick={() => setCount(count - 1)}> -</button>;
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
