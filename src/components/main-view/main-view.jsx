import React from 'react';
import axios from 'axios';

// import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

// make new component usable by others.
// "export" keyword exposes the  MainView component.
// "class" keyword defines component as class React.Component 
export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      // determine if a movie was clicked for details. 
      selectedMovie: null
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  // controls what the component displays - via render().
  render() {
    const { movies, selectedMovie } = this.state;

    // if (selectedMovie) return <MovieView movie={selectedMovie} />;

    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
          : movies.map(movie => (
            <MovieCard key={movie._id} movieData={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
          ))
        }
      </div>
    );
  }
}

