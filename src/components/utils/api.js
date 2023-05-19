import axios from 'axios'
import { FakeData } from './Fakeapi.js'


const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Mzk4MWZkYjc0YjU0N2QyMzYwNGUyMWZlZjk4ZDdmNiIsInN1YiI6IjY0NTBjYWU3ZTE2ZTVhMDE1ZGI0NDZiNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HRdcKP4D7AJ58j_E7LeXK9iE1MRcOOPVXbFj0DxqFBQ'
const constant = {
    headers: {
        'Authorization' : `Bearer ${token}`,
        'accept' : 'application/json'
    }
}
const baseURL = 'https://api.themoviedb.org/3/'
export const URLIMG = 'https://image.tmdb.org/t/p/'
const urlPopularMovies = "https://api.themoviedb.org/3/movie/popular"
const urlTop_ratedMovies = "https://api.themoviedb.org/3/movie/top_rated"

export const FetchGetapi = async () => {
    try {
        // const response = await axios.get(`${baseURL}/trending/all/day`, {
        //     headers: {
        //         'Authorization' : `Bearer ${token}`,
        //         'accept' : 'application/json'
        //     }
        // })
        //     return response.data
        return FakeData.results
    }
    catch (err) {
        console.log(err.response)
    }
}

export const apiGetMovies = async (param) => {
    try {
        const response = await axios.get(`${baseURL}/movie/${param}`, {
            headers: {
                'Authorization' : `Bearer ${token}`,
                'accept' : 'application/json',
            }
        })
        return response.data.results
    }
    catch (err) {
        console.log(err.response)
    }
}
