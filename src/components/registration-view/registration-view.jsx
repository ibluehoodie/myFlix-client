import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  // Declare hook for each input
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [birthdayErr, setBirthdayErr] = useState('');

  // Validate user inputs;
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username required');
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr('Username must be at least 2 characters');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password required');
      isReq = false;
    } else if (username.length < 6) {
      setPasswordErr('Password must be at least 6 characters');
      isReq = false;
    }
    if (!email) {
      setEmailErr('Email required');
      isReq = false;
    } else if (email.indexOf('@') == -1) {
      setEmailErr('Must include valid email address');
      isReq = false;
    }
    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      /* Send a request to the server for authentication,
      then call props.onRegistered(username). Allows user to login without correct credentials - but will need to relogin if page refreshes. */
      axios.post('https://ibluehoodie-movie-app.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
        .then(response => {
          // replace 'data' (exemplar) with 'userData';
          const userData = response.userData;
          console.log(userData);
          alert('Registration successful, you may login');
          window.open('/', '_self'); // page opens in current browser tab;
        })
        .catch(e => {
          alert('Unable to register');
          console.log('error registering the user')
        });
    }
  };

  return (
    // "e" in input prevents default page refresh on "submit".
    <Row className="login-view justify-content-md-center">
      <Col md={6}>
        <Form>

          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
            {/* add code here to display validation error */}
            {usernameErr && <p>{usernameErr}</p>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
            {/* add code here to display validation error */}
            {passwordErr && <p>{passwordErr}</p>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            {/* add code here to display validation error */}
            {emailErr && <p>{emailErr}</p>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBirthday">
            <Form.Label>Date of birth:</Form.Label>
            <Form.Control type="date" placeholder="Birthday MM/DD/YYYY" value={birthday} onChange={e => setBirthday(e.target.value)} />
            {/* add code here to display validation error */}
            {birthdayErr && <p>{birthdayErr}</p>}
          </Form.Group>

          <Button variant="primary" type="submit" onClick={handleSubmit}>Register</Button>
        </Form>
      </Col>
    </Row>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired
};
