import privateClients from "../apiClients/public.clients.js";

const mediaType = {
	mediaTypeList: ({media,top_view}) => `${media}/${top_view}`
}

const mediaApi = {
	getMovieType: async (top_view, media='movie') => {
		try {
			const response = await privateClients.get(mediaType.mediaTypeList({media,top_view}))
			if (response) {
				return response
			}
		}
		catch (err) {
			console.log(err.response.status)
			console.log(err.response.data)
		}
	},
	getSeriesType: async (top_view, media = 'tv') => {
		try {
			const response = await privateClients.get(mediaType.mediaTypeList({media,top_view}))
			if (response) {

				return response
			}
		}
		catch (err) {
			console.log(err.response.status)
			console.log(err.response.data)
		}
	}
}

export default mediaApi