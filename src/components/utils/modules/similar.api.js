import publicClients from "../apiClients/public.clients.js";

const similar = {
	similar: ({mediaType, mediaId}) => `${mediaType}/${mediaId}/similar`
}

export const similarApi = {
	getSimilar: async (mediaType, mediaId) => {
		try {
			const response = await publicClients.get(similar.similar({mediaType, mediaId}))
			if (response) {
				return response.results
			}
		}
		catch (err) {
			console.log(err)
		}
	}
}