import React, {useEffect, useState} from 'react';
import personApi from "./utils/modules/person.api.js";
import {useLocation} from "react-router-dom";
import urlConfigs from "./utils/modules/url.js";
import DisplayCredits from "./DisplayCredits.jsx";

const CastInformation = () => {
	const [credit, setCredit] = useState([]);
	const [actor, setActor] = useState({})
	const location = useLocation()
	const personId = location.state.id

	const getDetailsPerson = async (id) => {
		const response = await personApi.detail(id)
		if (response) {

			setActor(response)
		}
	}

	const getCreditsPerson = async (id) => {
		const response = await personApi.credits(id)
		if (response)
		{

			setCredit(response?.cast)
		}
	}

	useEffect(() => {
		getDetailsPerson(personId)
		getCreditsPerson(personId)
	}, [])

	return (
		<div className="h-screen mt-32 px-[5rem] w-full">
			<div className="w-full h-[450px] grid grid-cols-3 gap-x-6">
				<div className=" col-span-1 w-full flex justify-end -z-10">
					<img
						className="h-[400px] w-[320px] object-cover"
						src={urlConfigs.posterPath(actor?.profile_path)}
						alt={actor?.name}/>
				</div>

				<div className="text-white col-span-2 flex flex-col gap-y-5 text-4xl justify-start pt-5">
					<h1>{actor?.name} ({actor?.birthday})</h1>
					{actor?.biography &&
						<p className="text-xl"> {actor?.biography?.length > 750 ? actor?.biography.slice(0, 750) : actor?.biography} </p>}
				</div>
			</div>
			<div>
				<div className="w-full flex items-center justify-center my-6">
					<h1 className="text-5xl uppercase text-white border-b-2 py-1 border-red-500 w-[11%]">
						Credits
					</h1>
				</div>
				<div className="px-[10rem]">
					<DisplayCredits list={credit} />
				</div>

			</div>
		</div>
	);
};

export default CastInformation;
