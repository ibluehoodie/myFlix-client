import React, { useState } from 'react';

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
      <button type="submit">Register</button>
    </form>
  );
}
