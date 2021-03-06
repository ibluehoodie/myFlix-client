import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Row, Col } from 'react-bootstrap';

import { Link } from 'react-router-dom';
// axios for POSTing request JWT request to login endpoint
import axios from 'axios';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Declare hook for each input
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  // Validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username required');
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr('Username must be at least 2 characters long');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password required');
      isReq - false;
    } else if (password.length < 6) {
      setPassword('Password must be at least 6 characters long');
      isReq = false;
    }

    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      /* Send a request to the server for authentication,
      then call props.onLoggedIn(username). Allows user to login without correct credentials - but will need to relogin if page refreshes. */
      axios.post('https://ibluehoodie-movie-app.herokuapp.com/login', {
        Username: username,
        Password: password
      })
        .then(response => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch(e => {
          console.log('not a valid user')
        });
    }
  };

  // const handleRegister = (e) => {
  //   e.preventDefault()
  //   props.onRegister(true)
  // };

  return (
    // "e" in input prevents default page refresh on "submit".
    <Row className="login-view justify-content-md-center">
      <Col md={6}>
        <Form>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
            {/* add code here to display validation error */}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            {/* add code here to display validation error */}
          </Form.Group>

          <div className="buttons">
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Login
            </Button>

            <Link to={"/register"}>
              <Button variant="secondary" type="submit">Register</Button>
            </Link>
          </div>
        </Form>
      </Col>
    </Row>
  );
}

LoginView.propTypes = {
  register: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired
};
