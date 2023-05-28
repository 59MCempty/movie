import publicClients from "../apiClients/public.clients.js";

const personEndpoint = {
	detail: ({personId}) => `person/${personId}`,
	credits: ({personId}) => `person/${personId}/combined_credits`
}

const personApi = {
	detail: async (personId) => {

		try {
			const response = await publicClients.get(personEndpoint.detail({personId}))
			if (response)
				return response
		} catch (err) {
			console.log(err.response)
		}
	},
	credits: async (personId) => {
		try {
			const response = await publicClients.get(personEndpoint.credits({personId}))
			if (response)
				return response
		} catch (err) {
			console.log(err?.response)
		}
	},
}


export default personApi