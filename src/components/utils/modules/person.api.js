import publicClients from "../apiClients/public.clients.js";

const personEndpoint = {
	detail: ({personId}) => `person/${personId}`,
	images: ({personId}) => `person/${personId}/images`
}

const personApi = {
	detail: async (personId) => {
		console.log(personId)
		try {
			const response = await publicClients.get(personEndpoint.detail({personId}))
			console.log(response)
			if (response)
				return response
		}
		catch (err) {
			console.log(err.response)
		}
	},
	images: async (personId) => {
		const response = await publicClients.get(personEndpoint.images({personId}))
		if (response)
			return response
	},
}


export default personApi