import React, {useEffect, useState} from 'react';
import publicClients from "./utils/apiClients/public.clients.js";
import urlConfigs from "./utils/modules/url.js";
import url from "./utils/modules/url.js";
import {Link} from "react-router-dom";

const Cast = () => {
	const [cast, setCast] = useState([])
	const getPeople = async () => {
		try {
			const response = await publicClients.get('person/popular')
			if (response) {
				setCast(response?.results)
			}
		}
		catch (err) {
			console.log(err?.response)
		}

	}

	useEffect(() => {
		getPeople()
	}, [])

	return (
		<div className="h-screen w-full">
			<div className="my-32 px-20 h-full w-full">
				<div className="w-full h-14 flex items-center justify-center text-white my-5">
					<h1 className="text-5xl font-medium">
						Actor Popular
					</h1>
				</div>
				<div className=" gap-3 h-full w-full grid grid-cols-5">
					{cast?.map(item =>
						<Link to={`${item?.id}`} state={{id: item?.id}} key={item?.id} className="col-span-1 relative cursor-pointer">
							<img src={urlConfigs.posterPath(item?.profile_path)} alt={item?.name}/>
							<div className="absolute hover:bg-black/60 w-full h-full top-0 left-0 opacity-0 hover:opacity-100">
								<h1 className="text-white text-2xl absolute bottom-0 w-full">
									{item?.name}
								</h1>
							</div>
						</Link>
					)}
				</div>
			</div>

		</div>
	);
};

export default Cast;
