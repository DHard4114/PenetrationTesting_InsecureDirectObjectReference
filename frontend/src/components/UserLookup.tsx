import { useState } from 'react';

export default function UserLookup() {
  const [userId, setUserId] = useState('');
  type User = {
    id: number;
    username: string;
    email: string;
  };
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState('');

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setUser(null);
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const res = await fetch(`${apiUrl}/user/${userId}`);
      const data = await res.json();
      if (res.ok) {
        setUser(data);
      } else {
        setError(data.message || 'User not found');
      }
    } catch {
      setError('Network error');
    }
  };

  return (
    <form className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-sm mx-auto" onSubmit={handleLookup}>
      <h2 className="text-2xl font-bold mb-4 text-center text-white">User Lookup (IDOR)</h2>
      <div className="mb-4">
        <label className="block text-gray-300 text-sm font-bold mb-2">User ID</label>
        <input type="number" value={userId} onChange={e => setUserId(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-900 text-gray-100 leading-tight focus:outline-none focus:shadow-outline" required />
      </div>
      {error && <p className="text-red-400 text-xs italic mb-2 text-center">{error}</p>}
      <div className="flex items-center justify-between">
        <button className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Lookup
        </button>
      </div>
      {user && (
        <div className="mt-4 p-4 border rounded bg-gray-900 text-gray-100">
          <div><span className="font-semibold">ID:</span> {user.id}</div>
          <div><span className="font-semibold">Username:</span> {user.username}</div>
          <div><span className="font-semibold">Email:</span> {user.email}</div>
        </div>
      )}
    </form>
  );
}
