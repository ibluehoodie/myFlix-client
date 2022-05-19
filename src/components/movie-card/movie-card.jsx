import React from 'react';
import PropTypes from 'prop-types';

export class MovieCard extends React.Component {
  render() {
    const { movieData, onMovieClick } = this.props;

    return <div className="movie-card"
      onClick={
        () => {
          onMovieClick(movieData);
        }}>{movieData.Title}</div>;
  };
}

// -props obj must include movie object (shape({...})).
// -movie prop obj may contain a Title, and must be string if so.
// -props obj must contain onMovieClick as a function.
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};