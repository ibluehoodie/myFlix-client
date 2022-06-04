import React from 'react';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';

// make new component usable by others.
// "export" keyword exposes the  MainView component.
// "class" keyword defines component as class React.Component 
export class MainView extends React.Component {

  constructor() {
    super();
    // Initial state is set to null
    this.state = {
      movies: [],
      user: null
    };
  }

  // use axios to make a GET req to /movies endpoint of Node.js API;
  getMovies(token) {
    axios.get('https://ibluehoodie-movie-app.herokuapp.com/movies', {
      // passing bearer authorization in header of HTTP req to make authenticated reqs to API;
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        //Assign the result to the state;
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // 3.6 componentDidMount update for persistent login data;
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  // When a user successfully logs in, this function updates the 'user' property in the state to that *particular user 
  onLoggedIn(authData) {
    // 'authData includes 'user' and 'token' for 'data' from login-view handleSubmit() -> props.onLoggedIn(data);
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  // Clear authData (user and token) from localStorage. Needs onClick handler button in MainView;
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,
    });
  }

  // controls what the component displays - via render().
  render() {
    const { movies, user } = this.state;

    // 3.6 Embed in each <Router> except "/register";
    // if (!user) return <Row>
    //   <Col>
    //     <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
    //   </Col>
    // </Row>
    // if (movies.length === 0) return <div className="main-view" />;

    return (
      <Router>
        <Row className="main-view justify-content-md-center">

          <Route exact path="/" render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;

            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movieData={m} />
              </Col>
            ));
          }} />

          <Route path="/register" render={() => {
            if (user) {
              return <Redirect to="/" />;
            }
            return (
              // <Row className="justify-content-md-center">
              <Col>
                <RegistrationView />
              </Col>
              // </Row>
            );
          }} />

          <Route /*exact*/ path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <Row className="main-view" />;

            return <Col md={8}>
              <MovieView movieData={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route exact path="/genres/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <Row className="main-view" />;

            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route exact path="/directors/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <Row className="main-view" />;

            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          {/* Link route to profile-view */}
          <Route path={`/users/${user}`} render={({ history, match }) => {
            if (!user) {
              return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            }
            if (movies.length === 0) {
              return <div className="main-view" />
            }
            return (
              <ProfileView history={history} movies={movies} user={user === match.params.username} />
            );
          }} />

        </Row>
      </Router>
    );
  }
}