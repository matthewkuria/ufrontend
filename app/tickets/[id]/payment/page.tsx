'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';
import { PropagateLoader } from 'react-spinners';

export default function PaymentPage({ params }) {
  const router = useRouter();
  const { ticketId } = params;
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const token = Cookies.get('access_token');
        if (!token) {
          // Redirect to login with the current page URL as the `next` query parameter
            const currentPath = window.location.pathname;
            router.push(`/login?next=${encodeURIComponent(currentPath)}`);
          return;
        }

        const response = await axios.get(`http://localhost:8000/api/tickets/${ticketId}/payment`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setPaymentInfo(response.data);
      } catch (err) {
        setError('Failed to load payment details.');
      }
    };

    if (ticketId) {
      fetchPaymentDetails();
    }
  }, [ticketId]);

  if (error) return <p>{error}</p>;
  if (!paymentInfo) return (
    <div className=" flex flex-col justify-center items-center min-h-96">
        <PropagateLoader
          color="#f20f0f"
          size={19}
          speedMultiplier={2}
        />
    </div>
  );

  return (
    <div>
      <h1>Payment for Ticket {ticketId}</h1>
      <p>Amount: {paymentInfo.amount}</p>
      <p>Status: {paymentInfo.status}</p>
      {/* Add further payment handling details here */}
    </div>
  );
}
