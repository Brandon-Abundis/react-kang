import React, { useState, useEffect } from "react";
import { db } from "../backend/firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { Dropdown, Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const Grade = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [score, setScore] = useState(0);
  const [alertMessage, setAlertMessage] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollection);
        const usersData = usersSnapshot.docs
          .filter((doc) => doc.data().pdf !== null) // Filter out users with null PDFs
          .map((doc) => ({
            uid: doc.id,
            ...doc.data(),
          }));
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserChange = (selectedUid) => {
    const selectedUser = users.find((user) => user.uid === selectedUid);
    setSelectedUser(selectedUser);
    setScore(0); // Reset the score when a new user is selected
  };

  const handleScoreChange = (e) => {
    setScore(parseInt(e.target.value, 10));
  };

  const handleSubmitScore = async () => {
    if (selectedUser) {
      const userDocRef = doc(db, "users", selectedUser.uid);
      try {
        await updateDoc(userDocRef, { score: score });
        setAlertMessage("Score sent successfully!");
      } catch (error) {
        console.error("Error updating score:", error);
        setAlertMessage("Error sending score. Please try again.");
      }
    } else {
      setAlertMessage("Please select a user first.");
    }
  };

  const handleAlertClose = () => {
    setAlertMessage(null);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form.Group controlId="userDropdown">
            <Form.Label>Select User:</Form.Label>
            <Dropdown onSelect={handleUserChange}>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {selectedUser ? `${selectedUser.firstName} ${selectedUser.lastName}` : "Select User"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {users.map((user) => (
                  <Dropdown.Item key={user.uid} eventKey={user.uid} disabled={user.pdf === null}>
                    {`${user.firstName} ${user.lastName}`}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          {selectedUser && (
            <>
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                <Viewer fileUrl={selectedUser.pdf} />
              </Worker>
              <Form.Group controlId="scoreRange">
                <Form.Label>Score: {score}</Form.Label>
                <Form.Control
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={score}
                  onChange={handleScoreChange}
                />
              </Form.Group>
              <Button variant="primary" onClick={handleSubmitScore}>
                Submit Score
              </Button>
              {alertMessage && (
                <Alert variant="success" onClose={handleAlertClose} dismissible>
                  {alertMessage}
                </Alert>
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Grade;
