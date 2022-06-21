import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Row, Col, Container } from 'react-bootstrap';

import { Link } from 'react-router-dom';

export class GenreView extends React.Component {

  render() {
    const { genre, onBackClick } = this.props;

    return (
      <Card className="genreCard" text="dark">
        <Card.Header className="genreTitle">{genre.Name}</Card.Header>
        <Card.Body>
          <Card.Text>{genre.Description}</Card.Text>
          {/* <Card.Text> SubGenre - {genre.secondary_genre.Name}</Card.Text>
          <Card.Text>{genre.secondary_genre.Description}</Card.Text> */}
          <Button variants="primary" onClick={() => { onBackClick() }}>Back</Button>
        </Card.Body>
      </Card>
    );
  }
}