import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import sendRequest from '../../httpClient'
import HttpActionEnum from '../../enums/HttpActionEnum'
import TestimonyForm from '../../Component/TestimonyForm'
import Loader from '../../Component/Loader'

export default function OneTestimony() {
  const { id } = useParams()
  const [testimony, setTestimony] = useState({})

  useEffect(() => {
    async function fetchData() {
      const testimonies = await sendRequest(HttpActionEnum.GET, '/testimonials')
      const theTestimony = testimonies.data.filter((test) => test.id === parseInt(id, 10))[0]
      // console.log(theTestimony, 'theTestimony')
      setTestimony(theTestimony)
    }
    try {
      fetchData()
    } catch (error) {
      return error
    }
  }, [id])

  if (Object.keys(testimony).length !== 0) {
    return (
      <Container className="m-5">
        <TestimonyForm testimony={testimony} />
      </Container>
    )
  }
  return <Loader />
}
