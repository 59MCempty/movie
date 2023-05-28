import privateClients from "../apiClients/public.clients.js";

const trending = {
	trendingList: ({mediaType}) => `trending/${mediaType}/day`
}

const trendingApi = {
	getTrending: async (mediaType) => {
		try {
			const response = await privateClients.get(trending.trendingList({mediaType}))
			console.log(response)
			return response.results
		} catch (err) {
			console.log(err)
		}
	}
}

export default trendingApi


