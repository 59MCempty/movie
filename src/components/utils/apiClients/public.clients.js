import axios from "axios";
import queryString from "query-string"

// const key = "73981fdb74b547d23604e21fef98d7f6"
const baseURL = 'https://api.themoviedb.org/3/'
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Mzk4MWZkYjc0YjU0N2QyMzYwNGUyMWZlZjk4ZDdmNiIsInN1YiI6IjY0NTBjYWU3ZTE2ZTVhMDE1ZGI0NDZiNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HRdcKP4D7AJ58j_E7LeXK9iE1MRcOOPVXbFj0DxqFBQ'

const privateClients = axios.create({
	baseURL,
	timeout: 10000,
	paramsSerializer: {
		encode: params => queryString.stringify(params)
	}
});
 privateClients.interceptors.request.use(async config => {
	return {
		...config,
		headers: {
			'accept': 'application/json',
			'Authorization': `Bearer ${token}`,
		}
	}
})
privateClients.interceptors.response.use(response => {
		if (response && response.data) {
			return response.data
		}
		return response
	},
	(err) => {
		throw err.response.data
	}
)
export default privateClients


