/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card } from 'react-bootstrap';
import HttpActionEnum from '../enums/HttpActionEnum'
import sendRequest from '../httpClient'
import '../static/styles/testimonials.css'

function Testimonials() {
  const [testimonials, setTestimonials] = useState([])
  useEffect(() => {
    async function fetchData() {
      const testimos = await sendRequest(HttpActionEnum.GET, '/testimonials')
      setTestimonials(testimos.data)
    }
    try {
      fetchData()
    } catch (error) { }
  }, [])
  {console.log(testimonials)}

  return (
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
  )
}

export default Testimonials
