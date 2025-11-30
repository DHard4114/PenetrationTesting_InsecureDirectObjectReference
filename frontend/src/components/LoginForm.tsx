import { useState } from 'react';

type User = {
  id: number;
  username: string;
  email: string;
};

export default function LoginForm({ onLogin }: { onLogin: (user: User) => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const res = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok) {
        onLogin(data.user);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch {
      setError('Network error');
    }
  };

  return (
    <form className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-sm mx-auto" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4 text-center text-white">Login</h2>
      <div className="mb-4">
        <label className="block text-gray-300 text-sm font-bold mb-2">Username</label>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-900 text-gray-100 leading-tight focus:outline-none focus:shadow-outline" required />
      </div>
      <div className="mb-6">
        <label className="block text-gray-300 text-sm font-bold mb-2">Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-900 text-gray-100 mb-3 leading-tight focus:outline-none focus:shadow-outline" required />
      </div>
      {error && <p className="text-red-400 text-xs italic mb-2 text-center">{error}</p>}
      <div className="flex items-center justify-between">
        <button className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Login
        </button>
      </div>
    </form>
  );
}
