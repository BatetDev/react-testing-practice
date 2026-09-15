import { useState, useEffect } from 'react';
import User from './components/User';

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    async function fetchUser() {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users/1',
        );
        const data = await response.json();
        if (!ignore) setUser(data);
      } catch (err) {
        if (!ignore) setError(err.message);
      }
    }

    fetchUser();

    return () => {
      ignore = true;
    };
  }, []);

  if (error) {
    return <span>{error}</span>;
  }

  return (
    <div>
      <h1>Hello World</h1>
      <ul className='animals'>
        <li>Cat</li>
        <li>Whale</li>
        <li>Lion</li>
        <li>Elephant</li>
        <li>Rhino</li>
      </ul>
      <div>{user ? <User user={user} /> : <span>Loading...</span>}</div>
    </div>
  );
}

export default App;
