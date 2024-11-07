'use client';

import React, { useEffect, useState } from 'react';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export default function Members() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    async function fetchMembers() {
      const res = await fetch(`${apiUrl}/members/`);
      const data = await res.json();
      console.log(data)
      setMembers(data);
    }
    
    fetchMembers();
  }, []);

  return (
    <div>
      <h1>Our Church Members</h1>
      <ul>
        {members.map(member => (
          <li key={member.id}>{member.name} - {member.email}</li>
        ))}
      </ul>
    </div>
  );
}
