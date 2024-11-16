'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from '../context/AuthContext';
import ScaleLoader from 'react-spinners/ScaleLoader';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/";

  const { login, error, success, loading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {loading && <ScaleLoader color="hsla(217, 90%, 48%, 1)" size={10} speedMultiplier={3} />}
        {error && <p className="text-red-500 font-semibold">{error}</p>}
        {success && <p className="text-green-500 font-semibold">{success}</p>}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              className="mt-1 p-2 border border-gray-300 w-full rounded focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="mt-1 p-2 border border-gray-300 w-full rounded focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-800 text-white p-2 rounded hover:bg-blue-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <div className="mt-4 flex justify-end">
            <Link href="/signup">
              No account? <span className="text-blue-900 font-semibold hover:underline border-2 border-slate-200 px-1">Join Now</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
