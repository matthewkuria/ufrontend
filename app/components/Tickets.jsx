"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from 'next/navigation';
import { PropagateLoader } from 'react-spinners';

export default function TicketDetails({ ticketId: propTicketId }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ticketId = propTicketId || searchParams.get('ticketId');  // Use propTicketId if passed, otherwise get from route
  
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = Cookies.get("access_token");
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchTicket = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/tickets/${ticketId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,  
          },
        });
        setTicket(response.data);
        console.log(response.data)
      } catch (err) {
        setError('Failed to load ticket details.');
      }
    };

    if (ticketId) {
      fetchTicket();
    } else {
      setError("Invalid ticket ID.");
    }
  }, [ticketId, router]);

  if (error) return <p>{error}</p>;

  if (!ticket)
    return (
      <div className="flex flex-col justify-center items-center min-h-96">
        <PropagateLoader color="#f20f0f" size={19} speedMultiplier={2} />
      </div>
    );

  return (
    <div className="flex flex-col text-xs border rounded-md p-4">
      <h1 className='text-xl font-bold'>Buy Match Ticket</h1>
      <div className="teams flex justify-between items-center p-2">
        <div className="team flex flex-col items-center">
          {ticket.match.home_team?.logo && (
            <img src={ticket.match.home_team.logo} alt={`${ticket.match.home_team.name} logo`} className="team-logo" />
          )}
          <span>{ticket.match.home_team?.name || 'Home Team'}</span>
        </div>
        <span className="vs">vs</span>
        <div className="team">
          {ticket.match.away_team?.logo && (
            <img src={ticket.match.away_team.logo} alt={`${ticket.match.away_team.name} logo`} className="team-logo" />
          )}
          <span>{ticket.match.away_team?.name || 'Away Team'}</span>
        </div>
      </div>
      <p className='font-semibold'>Match Date:{ticket.match.match_date}</p>
      <p className='font-semibold'>Stadium:{ticket.match.stadium}</p>
      <div className="flex justify-between font-bold text-red-500">
        <p className="">Price:Ksh.{ticket.price}</p>
        <p>Status: {ticket.status}</p>
      </div>
      {ticket.qr_code_image_url && (
        <div>
          <h3 className='font-semibold'>Scan this QR Code:</h3>
          <img src={`http://localhost:8000/api/tickets/${ticketId}/qr_code/`} alt="Ticket QR Code" />
        </div>
      )}
    </div>
  );
}
