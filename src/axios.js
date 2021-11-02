import axios from 'axios'

export default async function request(method, url) {
	const userData = JSON.parse(localStorage.getItem('user-data')) || null
	!userData && console.log('no userData')
	!userData.token && console.log('no token')
	const token = 'Bearer ' + userData.token
	return await axios({method, url, headers: {'Authorization' : token}})
		.catch(error => error.response)
}
