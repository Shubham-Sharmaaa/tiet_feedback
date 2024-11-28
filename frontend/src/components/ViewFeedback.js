import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ViewFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedback = async () => {
    try {
      const response = await axios.get('http://localhost:5000/feedback');
      setFeedbacks(response.data);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []); 

  return (
    <div>
      <h2>Feedback</h2>
      {feedbacks.length === 0 ? (
        <p>No feedback available.</p>
      ) : (
        <ul>
          {feedbacks.map((feedback) => (
            <li key={feedback.id}>
              <p><strong>Student:</strong> {feedback.studentName}</p>
              <p><strong>Teacher:</strong> {feedback.teacherName}</p>
              <p><strong>Feedback:</strong> {feedback.feedback}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ViewFeedback;
