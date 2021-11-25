import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import sendRequest from '../../httpClient'
import HttpActionEnum from '../../enums/HttpActionEnum'
import CategoryForm from '../../Component/CategoryForm'
import Loader from '../../Component/Loader'

export default function GetCategory() {
  const { id } = useParams()
  const [category, setCategory] = useState({})

  const fetchData = useCallback(async () => {
    const categories = await sendRequest(HttpActionEnum.GET, '/categories')
    if (categories && categories.data) {
      const categoryFiltered = categories.data
        .filter(
          (test) => test.id === parseInt(id, 10),
        )
      if (categoryFiltered && categoryFiltered.length) {
        setCategory({ ...categoryFiltered[0] })
      }
    }
  }, [id])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (Object.keys(category).length !== 0) {
    return (
      <Container className="m-5">
        <CategoryForm category={category} />
      </Container>
    )
  }
  return <Loader />
}
