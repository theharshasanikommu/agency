import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded shadow p-6">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <p className="text-sm text-gray-600 mb-6">This is a placeholder Login page. Replace with real form when ready.</p>
        <div className="flex gap-2">
          <Link to="/register" className="text-blue-600 underline">Go to Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
