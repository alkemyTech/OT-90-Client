import React, { useState, useEffect } from 'react'
import Table from '../../Component/Table'
import sendRequest from '../../httpClient'
import HttpActionEnum from '../../enums/HttpActionEnum'
// this line below is just for testing only
// eslint-disable-next-line max-len
// localStorage.setItem('user-data', JSON.stringify({ username: 'Ben', token: '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', role: '1' }))

export default function Users() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    sendRequest(HttpActionEnum.GET, '/users', null)
      .then((res) => setUsers(res.data))
      .catch((error) => error)
  }, [])
  const headers = ['firstName', 'lastName', 'email', 'image']
  return (
    <><Table headers={headers} data={users} title="Users" /></>
  )
}
