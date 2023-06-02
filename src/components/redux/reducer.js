const initialState = {
	search: {
		input: "",
		mediaType: "movie",
		isClick: false
	},
	movie: {
		mediaType: "movie",
		movieList: [],

	},
	tv: {
		mediaType: "tv",
		series: [],
	},
	similar: [],
}

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'search/newSearch':
			return {
				...state,
				search: action.payload
			}
		case 'movie/getMovies':
			return {
				...state,
				movie: {
					...state.movie,
					movieList: action.payload,
				}
			}
		case "tv_series/getTvSeries":
			console.log(action.payload)
			return {
				...state,
				tv: {
					...state.tv,
					series: action.payload,
				}
			}
		case 'similar':
			return {
				...state,
				similar: action.payload
			}
		default:
			return state
	}
}

export default rootReducer;
// action

