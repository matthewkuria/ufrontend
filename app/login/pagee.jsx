'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import Link from 'next/link';
import ScaleLoader from 'react-spinners/ScaleLoader';

export default function Login() {
  const router = useRouter();  // Next.js router for redirecting
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/";
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
  e.preventDefault();

  const email = e.target.email.value; // Assuming you have an input for email
  const password = e.target.password.value; // Assuming you have an input for password
    setLoading(true)
    setError('')
  try {
    const response = await fetch('http://localhost:8000/api/accounts/auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setLoading(false)
      setSuccess("Successful!")
      // Store tokens in cookies
      Cookies.set('access_token', data.access, { expires: 1, secure: true, sameSite: 'Strict' });
      Cookies.set('refresh_token', data.refresh, { expires: 7, secure: true, sameSite: 'Strict' });
      //  const token = getCookie('access_token');
      // alert("Login Successful!")
      // Redirect based on user role
      router.push(next || '/fan-dashboard');
    } else {
      
      console.error('Login failed:', data.error);
      alert(data.error || 'Login failed'); // Show error message to the user
      setLoading(false)
      setError(data.error)
    }
  } catch (error) {
    console.error('Error during login:', error);
    alert('Error during login. Please try again.'); // Handle network or other errors
  }
  };
  

  return (
    <>      
    <div className="min-h-screen flex items-center justify-center bg-gray-100">     
      <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          {loading && <ScaleLoader
                color="hsla(217, 90%, 48%, 1)"
                  size={10}
                  speedMultiplier={3}
              /> }
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
                autoComplete='username'
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
              autoComplete='current-password'
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 border border-gray-300 w-full rounded focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-800 text-white p-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
            <div className='mt-4 flex justify-end'>
            <Link href="signup" className="">No, account?<span className='text-blue-900 font-semibold hover:underline border-2 border-slate-200 px-1'>Join Now</span></Link>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}
