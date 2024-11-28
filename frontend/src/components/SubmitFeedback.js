import React, { useState } from 'react';
import axios from 'axios';

function SubmitFeedback({ onFeedbackPosted }) {
  const [studentName, setStudentName] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/feedback', {
        studentName,
        teacherName,
        feedback,
      });
      alert('Feedback submitted successfully!');
      setStudentName('');
      setTeacherName('');
      setFeedback('');
      onFeedbackPosted(); 
    } catch (err) {
      console.error('Error submitting feedback:', err);
      alert('Failed to submit feedback. Try again.');
    }
  };

  return (
    <div>
      <h2>Submit Feedback</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Teacher's Name"
          value={teacherName}
          onChange={(e) => setTeacherName(e.target.value)}
          required
        />
        <textarea
          placeholder="Feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required
        />
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
}

export default SubmitFeedback;
