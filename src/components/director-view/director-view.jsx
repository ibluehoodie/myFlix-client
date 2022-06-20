import React from 'react';
import PropTypes from 'prop-types';
import { MovieCard } from '../movie-card/movie-card';
import { Button, Card, Row, Col, Container } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import './director-view.scss';

export class DirectorView extends React.Component {

  // handleOnItemClick = (param) => (e) => {
  //   const { history } = withRouter;
  //   this.props.history.push(`/movies/${param}`);
  // };

  render() {
    const { director, onBackClick } = this.props;

    // console.log(directorMovies) // this is undefined
    // // display movies by ${director.Name};
    // let directorCards = directorMovies.map(movieData => (
    //   <Col md={3} key={movieData._id}>
    //     <MovieCard movieonMovieClick={() => this.handleOnItemClick(movieData._id)} />
    //   </Col>
    // ));

    return (
      // <Container className="directorView">
      //   <Row>
      <Card className="directorCard" text="dark">
        <Card.Header className="directorTitle">{director.Name}</Card.Header>
        <Card.Body>
          <Card.Text> Biography: {director.Bio}</Card.Text>
          <Card.Text>Born: {director.Birth_Year}</Card.Text>
          <Button variants="primary" onClick={() => { onBackClick() }}>Back</Button>
        </Card.Body>
      </Card>
      //   </Row>
      //   {/* <Row>
      //     {directorCards}
      //   </Row> */}
      // </Container>
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};