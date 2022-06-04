import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Row, Col, Container } from 'react-bootstrap';

import { Link } from 'react-router-dom';

export class DirectorView extends React.Component {

  render() {
    const { director, onBackClick } = this.props;

    return (
      <Card className="directorCard" text="dark">
        <Card.Header className="directorTitle">{director.Name}</Card.Header>
        <Card.Body>
          <Card.Text> Biography: {director.Bio}</Card.Text>
          <Card.Text>Born: {director.Birth_Year}</Card.Text>
          <Button variants="primary" onClick={() => { onBackClick() }}>Back</Button>
        </Card.Body>
      </Card>
    );
  }
}