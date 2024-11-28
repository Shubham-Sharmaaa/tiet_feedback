import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ViewNotices() {
  const [notices, setNotices] = useState([]);

  const fetchNotices = async () => {
    try {
      const response = await axios.get('http://localhost:5000/notices');
      setNotices(response.data);
    } catch (error) {
      console.error('Error fetching notices:', error);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []); 

  return (
    <div>
      <h2>Notices</h2>
      {notices.length === 0 ? (
        <p>No notices available.</p>
      ) : (
        <ul>
          {notices.map((notice) => (
            <li key={notice.id}>
              <h3>{notice.title}</h3>
              <p>{notice.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ViewNotices;
