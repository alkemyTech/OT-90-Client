import axios from 'axios'

export default async function request(method, url) {
  const userData = JSON.parse(localStorage.getItem('user-data')) || null
  if (!userData) return { error: 'no userData' }
  if (!userData.token) return { error: 'no token' }
  const token = `Bearer  ${userData.token}`
  const response = await axios({ method, url, headers: { Authorization: token } })
    .catch((error) => error.response)
  return response
}
