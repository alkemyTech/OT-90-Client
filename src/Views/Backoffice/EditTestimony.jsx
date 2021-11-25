import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
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
  }, [])
  // console.log(Object.keys(testimony).length, 'keyes')

  if (Object.keys(testimony).length !== 0) return <TestimonyForm testimony={testimony} />
  return <h1>LOADING</h1>
}
