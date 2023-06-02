import React, {useEffect, useState} from 'react';
import {Link, NavLink, useNavigate} from "react-router-dom";
import {similarApi} from "./utils/modules/similar.api.js";
import urlConfigs from "./utils/modules/url.js";
import DisplayCredits from "./DisplayCredits.jsx";
import {useNavigation} from "react-router-dom";


const SimilarMovies = ({movie, media}) => {
	const [similarList, setSimilarList] = useState([]);

	const getSimilar = async (mediaType, mediaId) => {
		const response = await similarApi.getSimilar(mediaType, mediaId)
		if (response) {
			setSimilarList([...response].sort(() => 0.5 - Math.random()).slice(0, 4))
		}
	}
	// const getMultipleRandom = (arr, num) => {
	// 	const shuffled = [...arr].sort(() => 0.5 - Math.random());
	// 	return shuffled.slice(0, num);
	// }

	useEffect(() => {
		getSimilar(media, movie?.id)
	}, [])


	return (
		<div className="py-20">
			<h1 className="text-5xl uppercase text-white border-b-4 pb-1 border-red-600 font-medium w-[30%] my-3">
				you may also like:
			</h1>
			<div className="w-full">
				{similarList && <DisplayCredits list={similarList} media={media} />}
			</div>
		</div>
	);
};

export default SimilarMovies;
