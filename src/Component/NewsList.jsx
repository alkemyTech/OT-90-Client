import React from 'react';
import PropTypes from 'prop-types'
import {
  Card, Row, Col,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../static/styles/NewsList.css'

const NewsList = ({ news }) => (
  <Row xs={1} md={2} lg={4} className="g-4">
    {news.map(({ name, image, id }) => (
      <Col key={id}>
        <Card className="card_news">
          <Link className="text-decoration-none text-dark" to={`/novedades/${id}`}>
            <div className="card_img_box"><Card.Img className="card_img" variant="top" src={image} /></div>
            <Card.Body>
              <Card.Title className="text-capitalize">{name}</Card.Title>
            </Card.Body>
          </Link>
        </Card>
      </Col>
    ))}
  </Row>
);

NewsList.propTypes = {
  news: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default NewsList
