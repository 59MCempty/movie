import publicClients from "../apiClients/public.clients.js";

const mediaDetails = {
	List: ({mediaType, mediaId, category}) => `${mediaType}/${mediaId}/${category}`,
	search: ({mediaType, keyword}) => `search/${mediaType}?query=${keyword}&page=1`,
	details: ({mediaType, mediaId}) => `${mediaType}/${mediaId}`,
}

const detailsApi = {
	getDetails: async (mediaType, mediaId) => {
		try {
			const response = await publicClients.get(mediaDetails.details({mediaType, mediaId}));
			if (response) {
				return response
			}
		}
		catch (err) {
			console.log("details err >>>", err.response)
		}
	},

	getMediaList: async (mediaType, mediaId, category = "") => {
		try {
			const response = await publicClients.get(mediaDetails.List({mediaType, mediaId, category}))
			if (response) {
				return response
			}
		} catch (err) {
			console.log('cast >>>', err.response)
		}
	},

	search: async (mediaType, keyword) => {
		try {
			const response = await publicClients.get(mediaDetails.search({mediaType, keyword}))

			if (response) {
				return response?.results
			}
		} catch (err) {
			console.log('search error >>>', err.response)
		}
	}

}
detailsApi.search("movie", "fast")
export default detailsApi