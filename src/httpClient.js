import axios from 'axios'

export default async function sendRequest(method, relativeUrl, data) {
  const userData = JSON.parse(localStorage.getItem('user-data'))
  const Authorization = userData ? `Bearer ${userData.token}` : null
  const baseUrl = process.env.REACT_APP_NODE_ENV === 'production'
    ? process.env.REACT_APP_BASE_URL_PRODUCTION
    : process.env.REACT_APP_BASE_URL_LOCAL
  const url = baseUrl + relativeUrl
  const response = await axios({
    method, url, data, headers: { Authorization },
  })
    .catch((error) => {
      throw error.message
    })

  return response
}
