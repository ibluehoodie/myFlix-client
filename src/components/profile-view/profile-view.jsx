import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row, Modal } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import axios from 'axios';
import { Link } from 'react-router-dom';

export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
    };
  }

}