'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import axios from 'axios';
import ScaleLoader from 'react-spinners/ScaleLoader';

const MyAccountDashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch profile, subscriptions, and settings on load
  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login with the current page URL as the `next` query parameter
      const currentPath = window.location.pathname;
      router.push(`/login?next=${encodeURIComponent(currentPath)}`);
      return;
    }

    const fetchAccountData = async () => {
      try {
        const token = Cookies.get('access_token');
        const headers = { Authorization: `Bearer ${token}` };

        // Fetch profile information
        const profileRes = await axios.get('http://localhost:8000/api/accounts/user-profile/', { headers });
        setProfile(profileRes.data);

        // Fetch subscriptions
        const subscriptionsRes = await axios.get('http://localhost:8000/api/accounts/subscriptions/', { headers });
        setSubscriptions(subscriptionsRes.data);

        // Fetch user settings
        const settingsRes = await axios.get('http://localhost:8000/api/accounts/settings/', { headers });
        setSettings(settingsRes.data);

      } catch (error) {
        console.error('Error fetching account data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccountData();
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout(); // Logs the user out
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-8">
        {loading ? (
          <div className="flex justify-center">
            <ScaleLoader color="hsla(217, 90%, 48%, 1)" size={10} speedMultiplier={3} />
          </div>
        ) : (
          <>
            <div className="bg-white p-6 rounded shadow-md mb-8">
              <h2 className="text-3xl font-bold mb-4">My Account</h2>

              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Profile</h3>
                <button onClick={handleLogout} className="text-blue-500 hover:underline">Logout</button>
              </div>
              <div className="mt-4">
                <p><strong>Name:</strong> {profile?.name}</p>
                <p><strong>Email:</strong> {profile?.email}</p>
                <p><strong>Phone:</strong> {profile?.phone}</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded shadow-md mb-8">
              <h3 className="text-xl font-semibold">Subscriptions</h3>
              <div className="mt-4">
                {subscriptions.length > 0 ? (
                  subscriptions.map((sub) => (
                    <div key={sub.id} className="mb-4">
                      <p><strong>Plan:</strong> {sub.plan_name}</p>
                      <p><strong>Status:</strong> {sub.status}</p>
                      <p><strong>Next Billing Date:</strong> {sub.next_billing_date}</p>
                    </div>
                  ))
                ) : (
                  <p>No active subscriptions.</p>
                )}
              </div>
            </div>

            <div className="bg-white p-6 rounded shadow-md">
              <h3 className="text-xl font-semibold">Settings</h3>
              <div className="mt-4">
                <button
                  onClick={() => router.push('/settings/email')}
                  className="text-blue-500 hover:underline"
                >
                  Change Email
                </button>
              </div>
              <div className="mt-2">
                <button
                  onClick={() => router.push('/settings/password')}
                  className="text-blue-500 hover:underline"
                >
                  Change Password
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyAccountDashboard;
