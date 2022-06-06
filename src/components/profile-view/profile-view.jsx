/*
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
*/

import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import "./profile-view.scss";
import { Card } from "react-bootstrap";

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

  componentDidMount() {
    this.getUserDetails();
  }

  getUserDetails() {
    const Username = localStorage.getItem("user");
    let token = localStorage.getItem("token");

    axios
      .get(`https://ibluehoodie-movie-app.herokuapp.com/users/${Username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setUsername(input) {
    this.setState({ Username: input });
  }

  setPassword(input) {
    this.setState({ Password: input });
  }

  setEmail(input) {
    this.setState({ Email: input });
  }

  setBirthday(input) {
    this.setState({ Birthday: input });
  }

  editUserDetails = (e) => {
    e.preventDefault();

    const Username = localStorage.getItem("user");
    let token = localStorage.getItem("token");

    axios
      .put(
        `https://ibluehoodie-movie-app.herokuapp.com/users/${Username}`,
        {
          Username: this.state.Username,
          Password: this.state.Password,
          Email: this.state.Email,
          Birthday: this.state.Birthday,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
        });
        localStorage.setItem("user", this.state.Username);
        alert(`Profile has been updated.`);
        window.open("/", "_self"); // So the page will open in the current tab
      })
      .catch((response) => {
        console.error(response);
      });
  };

  deleteProfile = (e) => {
    e.preventDefault();

    let result = confirm(`Are you sure you want to delete your profile?`);

    if (result) {
      const Username = localStorage.getItem("user");
      let token = localStorage.getItem("token");

      axios
        .delete(`https://ibluehoodie-movie-app.herokuapp.com/users/${Username}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          alert(`Profile has been deleted.`);
          localStorage.clear();
          window.open("/", "_self"); // So the page will open in the current tab
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  removeFavorite = (movie) => {
    const Username = localStorage.getItem("user");
    let token = localStorage.getItem("token");

    axios
      .delete(
        `https://ibluehoodie-movie-app.herokuapp.com/users/${Username}/movies/${movie._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response);
        // alert(`${movie.Title} has been removed from your favorites.`);
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {

    const { Username, Password, Email, Birthday, FavoriteMovies } = this.state
    const { movies } = this.props;

    return (
      <>
        {console.log(this.state)}
        <Row className="justify-content-md-center">
          {FavoriteMovies.length === 0 ? (
            <p class="white-text">You have no favorite movies.</p>
          ) : (
            movies
              .filter((movie) => FavoriteMovies.includes(movie._id))
              .map((movie) => (

                <Col md={3}>
                  <Card className="favorite-movie card-content" key={movie._id}>
                    <Card.Img
                      className="fav-poster"
                      variant="top"
                      src={movie.ImagePath}
                      crossorigin="anonymous"
                    />
                    <Card.Body>
                      <Card.Title className="movie_title">{movie.Title}</Card.Title>
                      <Button
                        size="sm"
                        variant="danger"
                        value={movie._id}
                        onClick={(e) => this.removeFavorite(movie)}
                      >
                        Remove
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              )))}
        </Row>

        <Row className="justify-content-md-center">
          <Col md={6}>
            <Form>
              <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter new username"
                  value={Username}
                  onChange={(e) => this.setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter new password"
                  value={Password}
                  onChange={(e) => this.setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter new email"
                  value={Email}
                  onChange={(e) => this.setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBirthday">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control
                  type="date"
                  value={Birthday}
                  onChange={(e) => this.setBirthday(e.target.value)}
                />
              </Form.Group>
              <div className="buttons">
                <Button
                  variant="primary"
                  type="submit"
                  onClick={this.editUserDetails}
                >
                  Update Information
                </Button>
                <Button
                  variant="danger"
                  type="submit"
                  onClick={(e) => this.deleteProfile(e)}
                >
                  Delete Profile
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </>
    );
  }
}