import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import { Row, Col, Container } from 'react-bootstrap';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

// 0#
import { setUser, setMovies } from '../../actions/actions';

/* 
  #1 The rest of components import statements but without the MovieCard's 
  because it will be imported and used in the MoviesList component rather
  than in here. 
*/
import { MoviesList } from '../movies-list/movies-list';
import { LoginView } from '../login-view/login-view';
// import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';
import { NavbarView } from '../navbar-view/navbar-view';

import './main-view.scss';

// #2 "export" keyword removed from here;
class MainView extends React.Component {
  constructor() {
    super();

    // #3 movies state removed from here;
    this.state = {
      user: null,
      movies: []
    };
  }

  // 3.6 componentDidMount update for persistent login data;
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      // 3.8 update;
      const { setUser } = this.props;
      setUser(localStorage.getItem('user'));
      // Replace 3.6 setState ;
      // this.setState({
      //   user: localStorage.getItem('user')
      // });
      this.getMovies(accessToken);
    }
  }

  // Update state of selectedMovie property on click;
  // TROUBLESHOOT - update value as movieData?;
  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  // use axios to make a GET req to /movies endpoint of Node.js API;
  getMovies(token) {
    axios.get('https://ibluehoodie-movie-app.herokuapp.com/movies', {
      // passing bearer authorization in header of HTTP req to make authenticated reqs to API;
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {

        // #4
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
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

    // #5 movies is extracted from this.props rather than from the this.state;
    let { movies } = this.props;
    let { user } = this.props;

    return (
      <Router>
        <NavbarView user={user} />
        <Row className="main-view justify-content-md-center">

          <Route exact path="/" render={() => {
            if (!user && !localStorage.getItem('user')) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            // #6
            // return <MoviesList movies={movies} />;
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

          {/* <Route path={`/users/${user}`} render={({ */}

          {/* Link route to profile-view */}
          <Route path={`/users/:username`} render={({
            match, history }) => {
            if (!user) {
              return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
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
  // Close MainView extends react-component;
}

// #7
let mapStateToProps = state => {
  return {
    user: state.user,
    movies: state.movies
  }
}

// #8
export default connect(mapStateToProps, { setUser, setMovies })(MainView);