import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
// import Image from 'react-bootstrap/Image';

import { Link } from 'react-router-dom';

export class MovieCard extends React.Component {
  render() {
    const { movieData, onMovieClick } = this.props;

    return (
      <Card className="justify-content-md-center">
        <Card.Img variants="top" src={movieData.ImagePath} />
        <Card.Body>
          <Card.Title>{movieData.Title}</Card.Title>
          <Card.Text>{movieData.Description}</Card.Text>
          <Button onClick={() => onMovieClick(movieData)} iant="link">Open</Button>
        </Card.Body>
      </Card>
    );
  }
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