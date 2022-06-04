import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Row, Col } from 'react-bootstrap';

import { Link } from 'react-router-dom';
// axios for POSTing request JWT request to login endpoint
import axios from 'axios';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication,
    then call props.onLoggedIn(username). Allows user to login without correct credentials - but will need to relogin if page refreshes. */
    props.onLoggedIn(username);
  };

  const handleRegister = (e) => {
    e.preventDefault()
    props.onRegister(true)
  };

  return (
    // "e" in input prevents default page refresh on "submit".
    <form>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <button type="submit" onClick={handleSubmit}>Submit</button>
      <br>
      </br>
      <button type="submit" onClick={handleRegister}>Register</button>
    </form>
  );
}
