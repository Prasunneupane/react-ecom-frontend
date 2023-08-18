import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast';
import Header from './Header';

function Login() {
  const history = useNavigate();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showToast, setShowToast] = useState(false); // State variable for controlling toast visibility
  const [toastMessage, setToastMessage] = useState(''); //Set toast Message

  useEffect(() => {
    if (localStorage.getItem('user-info')) {
      history('/add');
    }
  }, []);

  async function signin() {
    let item = { email, password };
    console.log(item);

    let result = await fetch('http://127.0.0.1:8000/api/login', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    result = await result.json();

    if (result.status === 'success') {
      localStorage.setItem('user-info', JSON.stringify(result.data));
      history('/add');
    } else {
      setShowToast(true); // Display the toast message
      setToastMessage(result.error);
    }
  }

  return (
    <div>
      <Header />
      <div>
        <div>
          <Container>
            <Row className="vh-100 d-flex justify-content-center align-items-center">
              <Col md={8} lg={6} xs={12}>
                <div className="border border-3 border-primary"></div>
                <Card className="shadow">
                  <Card.Body>
                    <div className="mb-3 mt-md-4">
                      <h2 className="fw-bold mb-2 offset-sm-4 text-uppercase ">Ecommerce Dashboard</h2>
                      <p className=" mb-5 offset-sm-3">Please enter your login and password!</p>
                      <div className="mb-3">

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label className="text-center">
                            Email address
                          </Form.Label>
                          <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword"
                        >
                          <Form.Label>Password</Form.Label>
                          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                        </Form.Group>

                        <div className="d-grid">
                          <Button variant="primary" onClick={signin}>
                            Login
                          </Button>
                        </div>

                        <div className="mt-3">
                          <p className="mb-0 text-center">
                            Don't have an account?{' '}
                            <a className="text-primary fw-bold">
                              Sign Up
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      {/* Toast component */}
      <Toast onClose={() => setShowToast(false)} show={showToast} delay={4000} className="position-fixed top-0 end-0 p-3"
          style={{ zIndex: 9999 }} bg="danger">
        <Toast.Header>
          <strong className="me-auto">Login Error</strong>
        </Toast.Header>
        <Toast.Body>{toastMessage}.</Toast.Body>
      </Toast>
    </div>
  );
}

export default Login;