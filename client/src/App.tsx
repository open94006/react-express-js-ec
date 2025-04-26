import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5100/api/product')
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        console.log(data);
        return setMessage(data.message)
      });
  }, []);

  return (
    <div>
      <h1>React + Express + TS</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
