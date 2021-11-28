/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, Container } from 'react-bootstrap';
import HttpActionEnum from '../enums/HttpActionEnum'
import sendRequest from '../httpClient'
import '../static/styles/testimonials.css'
import TestimonyForm from '../Component/TestimonyForm'

function Testimonials() {
  const [testimonials, setTestimonials] = useState([])
  const [change, setChange] = useState(false)
  useEffect(() => {
    async function fetchData() {
      const testimos = await sendRequest(HttpActionEnum.GET, '/testimonials')
      setTestimonials(testimos.data)
    }
    try {
      fetchData()
    } catch (error) {
      return error
    }
  }, [change])

  return (
    <div>
      <div className="testimonials">
        {testimonials && testimonials.map((testimony) => (
          <Card style={{ width: '18rem' }} key={testimony.id}>
            <Card.Img variant="top" src={testimony.image} />
            <Card.Body>
              <Card.Title>{testimony.name}</Card.Title>
              <Card.Text>
                {testimony.content}
              </Card.Text>
            </Card.Body>
          </Card>

        ))}

      </div>
      <Container>
        <TestimonyForm setChange={setChange} change={change} />
      </Container>
    </div>
  )
}

export default Testimonials
