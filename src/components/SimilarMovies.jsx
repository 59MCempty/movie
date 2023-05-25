import React, {useEffect, useState} from 'react';
import {apiGetMovies, apiGetTv_shows, URLIMG} from "./utils/api.js";
import {Link, NavLink, useNavigate} from "react-router-dom";
import Card from "./Card.jsx";

const SimilarMovies = ({movie, media}) => {
	const [hasClick, setHasClick] = useState(false)
	const [similarMovies, setSimilarMovies] = useState([]);
	const getSimilar = async (param) => {
		const response = media === "movie" ? await apiGetMovies(param) : await apiGetTv_shows(param)
		const Similar = response.slice(0, 5)?.filter(item => {
			return item?.id !== movie?.id
		})
		console.log(Similar)
		setSimilarMovies(Similar)

	}
	useEffect(() => {
		getSimilar("top_rated")
	}, [])


	return (
		<div className="py-20">
			<h1 className="text-5xl uppercase text-white border-b-4 pb-1 border-red-600 font-medium w-[30%] my-3">
				you may also like:
			</h1>
			<div className="grid grid-cols-5 gap-x-5">
				{
					SimilarMovies && similarMovies?.map(item =>
						<div key={item?.id} className="w-[332px] h-[440px]">

							<Link to={`/${media}/${item?.id}`} state={{movie: item, media_type: media}}>
								<img
									className="w-full h-full"
									src={`${URLIMG}w500${item?.backdrop_path}`} alt={item?.title}/>
							</Link>

						</div>
					)
				}
			</div>
		</div>
	);
};

export default SimilarMovies;
