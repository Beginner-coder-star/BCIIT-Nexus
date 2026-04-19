import React, { useEffect, useState } from 'react';
import axios from 'axios';

const backendUrl =
  String(import.meta.env.VITE_BACKEND_URL ?? '')
    .trim()
    .replace(/\/$/, '') || 'http://localhost:4000';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`${backendUrl}/api/user/get-profile`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        });

        if (res.data.success) {
          setUser(res.data.userData);
        } else {
          alert(res.data.message);
        }
      } catch (error) {
        alert(error.response?.data?.message || error.message);
      }
    };

    fetchProfile();
  }, []);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div>
      <h2>Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Degree: {user.degree}</p>
      <p>Batches: {user.batches}</p>
    </div>
  );
};

export default Profile;
