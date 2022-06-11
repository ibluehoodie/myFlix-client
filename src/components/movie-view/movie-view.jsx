import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';

import { Link } from 'react-router-dom';

export class MovieView extends React.Component {
  myProp;
  myOtherProp;

  // this constructor is just for demo purposes
  constructor() {
    super()
    // this just means "this class" or "this object", refering to this instance of MovieView;
    this.myProp = 'someValue';
    this.myOtherProp = 'someOtherValue';
  }


  // add favorite - test;
  addFavorite(movieData) {
    console.log(this.myProp)
    let user = localStorage.getItem("user");
    let token = localStorage.getItem("token");
    // this is where we think its messing up ******
    axios.put(`https://ibluehoodie-movie-app.herokuapp.com/users/${user}/movies/${movieData._id}`,
      {}, // body goes here
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then(() => {
        alert(`"${movieData.Title}" has been added to your favorites!`);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movieData, onBackClick } = this.props;

    return (
      <Card>
        <Card.Img variant="top" src={movieData.ImagePath} />
        <Card.Body>
          <Card.Title>{movieData.Title}</Card.Title>
          <Card.Text>{movieData.Description}</Card.Text>
          <Link to={`/directors/${movieData.Director.Name}`}>
            <Button>Director</Button>
          </Link>
          <Link to={`/genres/${movieData.Genre.Name}`}>
            <Button>Genre</Button>
          </Link>
          {/* this is where the addFavorite button should prompt an alert */}
          <Button onClick={() => {
            this.addFavorite(movieData);
          }}>
            Add to Favorites
          </Button>
          <Button onClick={() => {
            onBackClick();
          }}>
            Back
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieView.propTypes = {
  movieData: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};