import React, {useEffect, useState} from 'react';
import personApi from "./utils/modules/person.api.js";
import {useLocation} from "react-router-dom";
import urlConfigs from "./utils/modules/url.js";

const CastInformation = () => {
	const [actor, setActor] = useState({})
	const location = useLocation()
	const personId = location.state.id
	console.log(personId)
	const getDetailsPerson = async (id) => {
		const response = await personApi.detail(id)
		if (response) {
			console.log(response)
			setActor(response)
		}
	}

	useEffect(() => {
		getDetailsPerson(personId)
	}, [])

	return (
		<div className="h-screen mt-32 px-[5rem] w-full">
			<div className="w-full h-[450px] grid grid-cols-3 gap-x-6">
				<div className=" col-span-1 w-full flex justify-end -z-10">
					<img className="h-[400px] w-[320px] object-cover" src={urlConfigs.posterPath(actor?.profile_path)} alt={actor?.name}/>
				</div>

				<div className="text-white col-span-2 flex flex-col gap-y-5 text-4xl justify-start pt-5">
					<h1>{actor?.name} ({actor?.birthday})</h1>
					{actor?.biography && <p className="text-xl"> {actor?.biography?.length > 750 ? actor?.biography.slice(0,750) : actor?.biography} </p>}
				</div>

			</div>
		</div>
	);
};

export default CastInformation;
