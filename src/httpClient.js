import axios from 'axios'

const baseUrl = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_BASE_URL_PROD
  : process.env.REACT_APP_BASE_URL_LOCAL

export default async function sendRequest(method, relativeUrl, data) {
  let token = null
  const userData = JSON.parse(localStorage.getItem('user-data')) || null
  const role = userData ? userData.role : undefined
  const roleId = role === 'Admin' ? 1 : 2
  if (userData !== null) token = `Bearer ${userData.token}`
  const url = baseUrl + relativeUrl
  const response = await axios({
    method, url, data, headers: { Authorization: token, roleId },
  })
    .catch((error) => { throw error.message })
  return response
}
