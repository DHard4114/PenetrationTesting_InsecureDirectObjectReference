
import './App.css'

import { useState } from 'react';
import LoginForm from './components/LoginForm';
import UserInfo from './components/UserInfo';


type User = {
  id: number;
  username: string;
  email: string;
};

function App() {
  const [user, setUser] = useState<User | null>(null);
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <LoginForm onLogin={setUser} />
        <UserInfo user={user} />
        {/* Endpoint IDOR hanya tersedia di backend, tidak ada form di UI agar eksploitasi dilakukan manual (curl/kali linux) */}
      </div>
      <footer className="mt-8 text-gray-500 text-xs text-center">
        &copy; 2025 Pentest Final Project & SQL Injection & IDOR Demo
      </footer>
    </div>
  );
}

export default App
