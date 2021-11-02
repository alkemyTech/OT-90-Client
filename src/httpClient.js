import axios from 'axios'

export default async function request(method, url) {
  const userData = JSON.parse(localStorage.getItem('user-data')) || null
  !userData && return { error: 'no userData' }
  !userData.token && return { error: 'no token' }
  const token = `Bearer  ${userData.token}`
  return await axios({ method, url, headers: { Authorization: token } })
    .catch((error) => error.response)
}
