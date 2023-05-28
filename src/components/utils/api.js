import axios from 'axios'

const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Mzk4MWZkYjc0YjU0N2QyMzYwNGUyMWZlZjk4ZDdmNiIsInN1YiI6IjY0NTBjYWU3ZTE2ZTVhMDE1ZGI0NDZiNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HRdcKP4D7AJ58j_E7LeXK9iE1MRcOOPVXbFj0DxqFBQ'
const baseURL = 'https://api.themoviedb.org/3/'
export const URLIMG = 'https://image.tmdb.org/t/p/'


export const FetchGetapi = async (type) => {
	try {
		const response = await axios.get(`${baseURL}/trending/${type}/day`, {
			headers: {
				'Authorization': `Bearer ${token}`,
				'accept': 'application/json'
			}
		})
		return response.data.results
	} catch (err) {
		console.log(err.response)
	}
}

export const apiGetMovies = async (param) => {
	try {
		const requestMovies = await axios.get(`${baseURL}/movie/${param}`, {
			headers: {
				'Authorization': `Bearer ${token}`,
				'accept': 'application/json',
			}
		})
		if (requestMovies?.status === 200 && requestMovies?.data) {
			return requestMovies?.data?.results
		}
	} catch (err) {
		console.log(err.response)
	}
}

export const apiGetTv_shows = async (param) => {
	try {
		const requestSeries = await axios.get(`${baseURL}tv/${param}`, {
			headers: {
				'Authorization': `Bearer ${token}`,
				'accept': 'application/json',
			}
		})
		console.log(requestSeries)
		if (requestSeries?.status === 200 && requestSeries?.data) {
			return requestSeries?.data?.results
		}
	} catch (err) {
		console.log(err.response)
	}
}

export const apiMovieDetails = async (movie_id, kind, param) => {
	try {
		const requestDetails = await axios.get(`${baseURL}${kind}/${movie_id}${param}`, {
			headers: {
				'Authorization': `Bearer ${token}`,
				'accept': 'application/json',
			}
		})
		//console.log(`${baseURL}${kind}/${movie_id}${param}`)
		if (requestDetails?.status === 200 && requestDetails?.data) {
			return requestDetails?.data
		}
	} catch (err) {
		console.log(err?.response?.status)
	}
}
export const apiSearch = async (type, keyword) => {
	try {
		const requestSearch = await axios.get(`${baseURL}search/${type}`, {
			params: {
				query: keyword, page: 1
			},
			headers: {
				'Authorization': `Bearer ${token}`,
				'accept': 'application/json',
			}
		})
		if (requestSearch?.status === 200 && requestSearch?.data) {
			return requestSearch?.data?.results
		}
	}
	catch (err) {
		console.log(err?.response?.status)
	}
}