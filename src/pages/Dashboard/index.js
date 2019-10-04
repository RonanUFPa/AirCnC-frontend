import React, { useEffect, useState } from 'react';
import api from '../../services/Api';

export default function Dashboard() {
  const [ spots, setSpots ] = useState([]);

  useEffect(() =>{
    async function loadSpots() {
      const user_id = localStorage.getItem('User');
      const response = await api.get('/dashboard', {
        headers: {user_id}
      });

      setSpots(response.data);
    }
    loadSpots();
  }, []);
  return (
    <>
    <ul className="spot-list">
      {spots.map(spot => (
          <li key = {spot._id}>
            <header>
              <strong>{ spot.company }</strong>
              <span>{ spot.price }</span>
            </header>
          </li>
      ))}

    </ul>
    </>
  )
}
