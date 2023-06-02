import React, {useEffect, useState} from 'react'
import mediaApi from "./utils/modules/media.api.js";
import RowComponents from './RowComponents.jsx'
import axios from "axios";
import Spinner from "./Spinner.jsx";
import BannerDetails from "./BannerDetails.jsx";
import urlConfigs from "./utils/modules/url.js";
import {useDispatch, useSelector} from "react-redux";
import {getMovieList} from "./redux/action.js";


const Movies = () => {
	const dispatch = useDispatch();
	const movies = useSelector((state) => state.movie);

	const [loading, setLoading] = useState(false);
	const params = Object.values(urlConfigs.mediaCategoryOfMovie);

	const dataMovies = async () => {
		setLoading(true)
		try {
			const request = params.map(async param => {
				const res = await mediaApi.getMovieType(param)
				// check
				const obj = {}
				obj[param] = res.results
				return obj
			})
			const response = await axios.all(request)
			dispatch(getMovieList(response))
		} catch (err) {
			console.log(err)
		} finally {
			setLoading(false)
		}
	}
	useEffect(() => {
		dataMovies()
	}, [])

	const popular = movies.movieList.length > 0 ? movies.movieList[0].popular : null;
	const movie = popular ? popular[Math.floor(Math.random() * popular?.length)] : 0
	console.log(movies.mediaType)
	return (
		<div className="background relative">
			{popular && <Spinner loading={loading} list={popular}/>}
			<BannerDetails media={{media_type: movies.movieList.mediaType, media: movie}}/>
			<section className="m-5 absolute top-[70%] py-10">
				{
					movies.movieList.map((item, index) =>
						<RowComponents key={index} item={item} media={movies.mediaType} index={index}/>
					)
				}
			</section>
		</div>
	)
}

export default Movies
