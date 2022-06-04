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
  onLoggedIn(user) {
    this.setState({
      user,
    });
  }

  // placeholder for RegistrationView login function
  onRegister(user) {
    this.setState({
      registered,
    });
  }

  // controls what the component displays - via render().
  render() {
    const { movies, selectedMovie, user, registered } = this.state;

    // forcing a registration form for testing.
    // if (!registered) {
    //   return <RegistrationView onRegister={(bool) => this.onRegister(bool)} />;
    // }

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    if (!user) {
      return (
        <LoginView
          onLoggedIn={(user) => this.onLoggedIn(user)}
          onRegister={(bool) => this.onRegister(bool)}
        />
      );
    }

    // Before the movies have been loaded. 
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <div className="main-view">
        {/*If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned*/}
        {selectedMovie
          ? (
            <Row className="justify-content-md-center">
              <Col md={8} >
                <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
              </Col>
            </Row>
          )
          : (
            <Row className="justify-content-md-center">
              {movies.map(movie => (
                <Col md={4}>
                  <MovieCard key={movie._id} movieData={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                </Col>
              ))}
            </Row>
          )
        }
      </div>
    );
  }
}