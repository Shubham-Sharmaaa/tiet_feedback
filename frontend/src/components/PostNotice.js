import React, { useState } from 'react';
import axios from 'axios';

function PostNotice() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handlePostNotice = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:5000/notices', {
        title,
        content,
      });
      setSuccess('Notice posted successfully!');
      setTitle('');
      setContent('');
    } catch (err) {
      console.error('Error posting notice:', err);
      setError('Failed to post notice. Try again.');
    }
  };

  return (
    <div>
      <h2>Post Notice</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handlePostNotice}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Post Notice</button>
      </form>
    </div>
  );
}

export default PostNotice;
