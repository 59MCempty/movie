export const getNewSearch = (search) => {
	return {
		type: "search/newSearch",
		payload: search
	}
}
export const getMovieList = (movieList) => {
	return {
		type: "movie/getMovies",
		payload: movieList,
	}
}
export const getSeries = (series) => {

	return {
		type: "tv_series/getTvSeries",
		payload: series,
	}
}
export const getSimilar = (similar) => {

	return {
		type: "tv_series/getTvSeries",
		payload: similar,
	}
}


