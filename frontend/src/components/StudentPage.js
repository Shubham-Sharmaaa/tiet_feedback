// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Container, Button, Tab, Tabs, Form, Card } from "react-bootstrap";

// const StudentPage = () => {
//   const [activeKey, setActiveKey] = useState("feedback");
//   const [teacher, setTeacher] = useState("");
//   const [course, setCourse] = useState("");
//   const [feedback, setFeedback] = useState("");
//   const [notices, setNotices] = useState([]);

//   // Submit Feedback
//   const submitFeedback = async () => {
//     try {
//       await axios.post("http://localhost:5000/student/feedback", { teacher, course, feedback });
//       alert("Feedback submitted successfully!");
//       setTeacher("");
//       setCourse("");
//       setFeedback("");
//     } catch (err) {
//       console.error("Error submitting feedback:", err);
//     }
//   };

//   // Fetch Notices
//   const fetchNotices = async () => {
//     try {
//       const { data } = await axios.get("http://localhost:5000/student/notices");
//       setNotices(data);
//     } catch (err) {
//       console.error("Error fetching notices:", err);
//     }
//   };

//   // Auto-refresh notices
//   useEffect(() => {
//     fetchNotices();
//     const interval = setInterval(fetchNotices, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <Container className="mt-4">
//       <h1 className="text-center">Student Dashboard</h1>
//       <Tabs
//         activeKey={activeKey}
//         onSelect={(k) => setActiveKey(k)}
//         className="mb-3"
//         variant="pills"
//         justify
//       >
//         <Tab eventKey="feedback" title="Give Feedback">
//           <h2 className="mt-3">Provide Feedback</h2>
//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Label>Teacher Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter Teacher Name"
//                 value={teacher}
//                 onChange={(e) => setTeacher(e.target.value)}
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//             <Form.Label>Course Name</Form.Label>
//               <Form.Select
//                 value={course}
//                 onChange={(e) => setCourse(e.target.value)}
//             >
//             <option value="" disabled>
//                 Select a course
//             </option>
//             <option value="Cao">Computer Architecture And Organization</option>
//             <option value="Np">Network Programing</option>
//             <option value="Se">Software Engineering</option>
//             <option value="ML">Machine Learning</option>
//             <option value="pns">Probability And Statistics</option>
//           </Form.Select>
//           </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Feedback</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 placeholder="Write your feedback"
//                 value={feedback}
//                 onChange={(e) => setFeedback(e.target.value)}
//               />
//             </Form.Group>
//             <Button variant="primary" onClick={submitFeedback}>
//               Submit Feedback
//             </Button>
//           </Form>
//         </Tab>
//         <Tab eventKey="notices" title="View Notices">
//           <h2 className="mt-3">Notices</h2>
//           {notices.length === 0 ? (
//             <p className="text-muted">No notices available</p>
//           ) : (
//             notices.map((notice, index) => (
//               <Card key={index} className="mb-3">
//                 <Card.Body>
//                   <Card.Title>{notice.title}</Card.Title>
//                   <Card.Text>{notice.description}</Card.Text>
//                   <Card.Footer className="text-muted">
//                     Posted on: {new Date(notice.date).toLocaleString()}
//                   </Card.Footer>
//                 </Card.Body>
//               </Card>
//             ))
//           )}
//         </Tab>
//       </Tabs>
//     </Container>
//   );
// };

// export default StudentPage;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Button, Tab, Tabs, Form, Card, Row, Col } from "react-bootstrap";
import "./StudentPage.css"; // Import CSS for styling

const StudentPage = () => {
  const [activeKey, setActiveKey] = useState("feedback");
  const [teacher, setTeacher] = useState("");
  const [course, setCourse] = useState("");
  const [feedback, setFeedback] = useState("");
  const [notices, setNotices] = useState([]);

  // Submit Feedback
  const submitFeedback = async () => {
    try {
      const url = "https://tiet-feedback-api.vercel.app/student/feedback"
      await axios.post(url, { teacher, course, feedback });
      alert("Feedback submitted successfully!");
      setTeacher("");
      setCourse("");
      setFeedback("");
    } catch (err) {
      console.error("Error submitting feedback:", err);
    }
  };

  // Fetch Notices
  const fetchNotices = async () => {
    try {
      const { data } = await axios.get("https://tiet-feedback-api.vercel.app/student/notices");
      setNotices(data);
    } catch (err) {
      console.error("Error fetching notices:", err);
    }
  };

  // Auto-refresh notices
  useEffect(() => {
    fetchNotices();
    const interval = setInterval(fetchNotices, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container className="dashboard-container">
      <h1 className="text-center dashboard-title">Student Dashboard</h1>
      <Tabs
        activeKey={activeKey}
        onSelect={(k) => setActiveKey(k)}
        className="mb-3 dashboard-tabs"
        justify
      >
        <Tab eventKey="feedback" title="Give Feedback" className="tab-content">
          <h2 className="mt-3 section-title">Provide Feedback</h2>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Teacher Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Teacher Name"
                value={teacher}
                onChange={(e) => setTeacher(e.target.value)}
                className="form-input"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Course Name</Form.Label>
              <Form.Select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="form-input"
              >
                <option value="" disabled>
                  Select a course
                </option>
                <option value="Cao">Computer Architecture And Organization</option>
                <option value="Np">Network Programming</option>
                <option value="Se">Software Engineering</option>
                <option value="ML">Machine Learning</option>
                <option value="pns">Probability And Statistics</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Feedback</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Write your feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="form-input"
              />
            </Form.Group>
            <Button variant="primary" onClick={submitFeedback} className="submit-button">
              Submit Feedback
            </Button>
          </Form>
        </Tab>
        <Tab eventKey="notices" title="View Notices" className="tab-content">
          <h2 className="mt-3 section-title">Notices</h2>
          <Row className="notices-container">
            {notices.length === 0 ? (
              <p className="text-muted no-notices">No notices available</p>
            ) : (
              notices.map((notice, index) => (
                <Col key={index} md={6} className="mb-3">
                  <Card className="notice-card">
                    <Card.Body>
                      <Card.Title className="notice-title">{notice.title}</Card.Title>
                      <Card.Text>{notice.description}</Card.Text>
                      <Card.Footer className="text-muted">
                        Posted on: {new Date(notice.date).toLocaleString()}
                      </Card.Footer>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            )}
          </Row>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default StudentPage;
