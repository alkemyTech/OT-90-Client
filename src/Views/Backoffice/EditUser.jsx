import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import sendRequest from '../../httpClient'
import HttpActionEnum from '../../enums/HttpActionEnum'
import UserForm from '../../Component/UserForm'
import Loader from '../../Component/Loader'

export default function GetUsery() {
  const { id } = useParams()
  const [user, setUser] = useState({})

  const fetchData = useCallback(async () => {
    const users = await sendRequest(HttpActionEnum.GET, '/users')
    if (users && users.data) {
      const userFiltered = users.data
        .filter(
          (test) => test.id === parseInt(id, 10),
        )
      if (userFiltered && userFiltered.length) {
        setUser({ ...userFiltered[0] })
      }
    }
  }, [id])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (Object.keys(user).length !== 0) {
    return (
      <Container className="m-5">
        <UserForm user={user} />
      </Container>
    )
  }
  return <Loader />
}
