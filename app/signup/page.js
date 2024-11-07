'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Import AuthContext
import { useRouter } from 'next/navigation';

export default function Signup() {
  const { signup, loading } = useAuth(); // Destructure signup function and loading state
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null); // Reset error before each request

  try {
    await signup(formData); // Call the signup function from AuthContext
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      router.push('/login');  // Redirect after a brief delay
    }, 2000);  // 2-second delay for user to see success message
  } catch (error) {
    if (error.response && error.response.status === 400) {
      // Display specific error messages
      const errorMessages = Object.values(error.response.data)
        .flat()
        .join(', '); // Flatten and join multiple error messages
      setError(errorMessages || 'Signup failed');
    } else {
      setError(error.message || 'Signup failed');
    }
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">Signup successful! Redirecting to login...</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 w-full rounded focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
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
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 w-full rounded focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
            disabled={loading} // Disable button when loading
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
          <p className="mt-4 text-center">
            Have an account?{' '}
            <Link href="/login" className="text-indigo-600 hover:text-indigo-700">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
