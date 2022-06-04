import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';

import { Link } from 'react-router-dom';

  // example only: callback --> unmount. 
  // keypressCallback() component method will be callback function for addEventListener() and removeEventListener().
  keypressCallback(event) {
    console.log(event.key);
  }
  // adds event listener when MovieView mounts to DOM.
  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
  }
  // removes event listener when MovieView unmounts.
  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypressCallback);
  }

  render() {
    const { movie, onBackClick } = this.props;

    // placeholder image code
    // src="http://via.placeholder.com/400x600"
    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.ImagePath} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <button onClick={() => { onBackClick(null); }}>Back</button>

      </div>
    )
  }
}