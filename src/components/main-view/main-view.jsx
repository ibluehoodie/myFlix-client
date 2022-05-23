import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';


// make new component usable by others.
// "export" keyword exposes the  MainView component.
// "class" keyword defines component as class React.Component 
export class MainView extends React.Component {

  constructor() {
    super();
    // Initial state is set to null
    this.state = {
      movies: [],
      // determine if a movie was clicked for details. 
      selectedMovie: null,
      user: null
    };
  }

  componentDidMount() {
    axios.get('https://ibluehoodie-movie-app.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  // When a movie is clicked, this function is invoked and updates the state of the 'selectedMovie' *property to that movie.
  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
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