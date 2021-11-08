import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

export default async function sendRequest(method, relativeUrl, data) {
  let token = null
  const userData = JSON.parse(localStorage.getItem('user-data')) || null
  if (userData === !null) token = `Bearer  ${userData.token}`
  const baseUrl = process.env.REACT_APP_NODE_ENV === 'production'
    ? process.env.REACT_APP_BASE_URL_PRODUCTION
    : process.env.REACT_APP_BASE_URL_LOCAL
  const url = baseUrl + relativeUrl
  const response = await axios({
    method, url, data, headers: { Authorization: token },
  })
    .catch((error) => error.response)
  return response
}
