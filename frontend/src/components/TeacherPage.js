import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Button, Tab, Tabs, Form, Card } from "react-bootstrap";

const TeacherPage = () => {
  const [activeKey, setActiveKey] = useState("notices");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);

  const postNotice = async () => {
    try {
      await axios.post("https://tiet-feedback-api.vercel.app/teacher/notices", { title, description });
      alert("Notice posted successfully!");
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error("Error posting notice:", err);
    }
  };

  const fetchFeedbacks = async () => {
    try {
      const { data } = await axios.get("https://tiet-feedback-api.vercel.app/teacher/feedback");
      setFeedbacks(data);
    } catch (err) {
      console.error("Error fetching feedback:", err);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
    const interval = setInterval(fetchFeedbacks, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container className="mt-4">
      <h1 className="text-center">Teacher Dashboard</h1>
      <Tabs
        activeKey={activeKey}
        onSelect={(k) => setActiveKey(k)}
        className="mb-3"
        variant="pills"
        justify
      >
        <Tab eventKey="notices" title="Post Notice">
          <h2 className="mt-3">Create a Notice</h2>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Notice Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Notice Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Notice Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter Notice Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={postNotice}>
              Post Notice
            </Button>
          </Form>
        </Tab>
        <Tab eventKey="feedback" title="Student Feedback">
          <h2 className="mt-3">Feedback</h2>
          {feedbacks.length === 0 ? (
            <p className="text-muted">No feedback available</p>
          ) : (
            feedbacks.map((feedback, index) => (
              <Card key={index} className="mb-3">
                <Card.Body>
                  <Card.Title>{feedback.teacher}</Card.Title>
                  <Card.Text>
                    <strong>Course:</strong> {feedback.course}
                    <br />
                    <strong>Feedback:</strong> {feedback.feedback}
                  </Card.Text>
                  <Card.Footer className="text-muted">
                    Submitted on: {new Date(feedback.date).toLocaleString()}
                  </Card.Footer>
                </Card.Body>
              </Card>
            ))
          )}
        </Tab>
      </Tabs>
    </Container>
  );
};

export default TeacherPage;
