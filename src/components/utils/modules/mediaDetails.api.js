import publicClients from "../apiClients/public.clients.js";

const mediaDetails = {
	List: ({mediaType, mediaId, category}) => `${mediaType}/${mediaId}/${category}`,
	search: ({mediaType, keyword}) => `search/${mediaType}?query=${keyword}&page=1`
	// search/tv?query=superman&include_adult=false&language=en-US&page=1'
}

const detailsApi = {
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