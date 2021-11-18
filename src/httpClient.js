import axios from 'axios'

const baseUrl = process.env.NODE_ENV === 'development'
  ? process.env.REACT_APP_BASE_URL_LOCAL
  : process.env.REACT_APP_BASE_URL_PRODUCTION

export default async function sendRequest(method, relativeUrl, data) {
  const headers = {}
  const userData = JSON.parse(localStorage.getItem('user-data'))
  if (userData && userData.token) {
    headers.Authorization = `Bearer ${userData.token}`
  }
  const url = baseUrl + relativeUrl
  const response = await axios({
    method, url, headers, data,
  })
    .catch((error) => {
      throw error.message
    })

  return response
}
