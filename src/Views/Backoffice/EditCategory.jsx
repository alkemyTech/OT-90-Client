import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import sendRequest from '../../httpClient'
import HttpActionEnum from '../../enums/HttpActionEnum'
import CategoryForm from '../../Component/CategoryForm'
import Loader from '../../Component/Loader'

export default function GetCategory() {
  const { id } = useParams()
  const [category, setCategory] = useState({})


  useEffect(() => {
    async function fetchData() {
      const categories = await sendRequest(HttpActionEnum.GET, '/categories')
      const Category = categories.data.filter((test) => test.id === parseInt(id, 10))[0]
      setCategory(Category)
 
    }
    try {
      fetchData()
    } catch (error) {
      return error
    }
  }, [])

  if (Object.keys(category).length !== 0) {
    return (
      <Container className="m-5">
        <CategoryForm category={category} />
      </Container>
    )
  }
  return <Loader />
}
