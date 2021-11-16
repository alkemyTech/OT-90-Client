import React, { useState, useEffect } from 'react';
import { CardGroup } from 'react-bootstrap';
import Card from 'react-bootstrap/Card'
import sendRequest from '../httpClient'
import './Views.css'

const Members = () => {
  const [members, setMembers] = useState([]);

  const response = { success: true, body: null }

  const cargar = async () => {
    try {
      const member = await sendRequest('GET', '/members', null)
      setMembers(member.data)
    } catch (error) {
      response.success = false
      response.body = { error: error.message }
      throw response
    }
  }

  useEffect(() => {
    cargar()
  })

  return (
    <div style={{ textAlign: 'center' }}>
      <div> Miembros </div>
      <CardGroup>
        {
        members.map((memb) => (
          <Card key={memb.id}>
            <Card.Img className="Imagen" variant="top" src={memb.image} />
            <Card.Body>
              <Card.Title>{memb.name}</Card.Title>
            </Card.Body>
          </Card>
        ))
        }
      </CardGroup>
    </div>
  )
}

export default Members;
