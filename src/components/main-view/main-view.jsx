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
      movies: [
        { _id: 1, Title: 'Alien', Description: 'The crew of a commercial spacecraft encounter a deadly lifeform after investigating an unknown transmission.', ImagePath: 'https://www.imdb.com/title/tt0078748/mediaviewer/rm2032147969/' },
        { _id: 2, Title: 'Prometheus', Description: 'Following clues to the origin of mankind, a team finds a structure on a distant moon, but they soon realize they are not alone.', ImagePath: 'https://www.imdb.com/title/tt1446714/mediaviewer/rm430486784/' },
        { _id: 3, Title: 'Starship Troopers', Description: 'Humans in a fascist, militaristic future wage war with giant alien bugs.', ImagePath: 'https://www.imdb.com/title/tt0120201/mediaviewer/rm701657344/' }
      ],
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

