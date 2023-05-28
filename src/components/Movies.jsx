import React, {useEffect, useState} from 'react'
import mediaApi from "./utils/modules/media.api.js";
import RowComponents from './RowComponents.jsx'
import axios from "axios";
import Spinner from "./Spinner.jsx";
import BannerDetails from "./BannerDetails.jsx";
import urlConfigs from "./utils/modules/url.js";

const Movies = () => {
	const [movieCategories, setMovieCategories] = useState({
		popular: null,
		top_rated: null,
		upcoming: null,
	})
	const [loading, setLoading] = useState(false);
	const params = Object.values(urlConfigs.mediaCategoryOfMovie)

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

			if (response && response.length > 0) {
				await response.forEach((item) => {
					if (Object.keys(item)[0] === "popular" && Object.values(item)[0].length > 0) {
						setMovieCategories(prevState => ({
							...prevState,
							popular: Object.values(item)[0]
						}))
					}
					if (Object.keys(item)[0] === "top_rated" && Object.values(item)[0].length > 0) {
						setMovieCategories(prevState => ({
							...prevState,
							top_rated: Object.values(item)[0]
						}))
					}
					if (Object.keys(item)[0] === "upcoming" && Object.values(item)[0].length > 0) {
						setMovieCategories(prevState => ({
							...prevState,
							upcoming: Object.values(item)[0]
						}))
					}
				})
			}
		} catch (err) {
			console.log(err)
		} finally {
			setLoading(false)
		}
	}
	useEffect(() => {
		dataMovies()
	}, [])
	const popular = movieCategories?.popular
	const movie = popular ? popular[Math.floor(Math.random() * popular?.length)] : 0
	const media_type = movieCategories ? "movie" : ""
	return (

		<div className="background relative">
			{popular && <Spinner loading={loading} list={popular}/>}
			<BannerDetails media={movie}/>
			<section className="m-5 absolute top-[70%] py-10">
				<RowComponents
					media={media_type}
					category={movieCategories?.popular}
					idx="1"
					title="Popular movie"/>
				<RowComponents
					media={media_type}
					category={movieCategories?.top_rated}
					idx="2"
					title="Top Rated Movie"/>
				<RowComponents
					media={media_type}
					category={movieCategories?.upcoming}
					idx="3"
					title="Upcoming movie"/>
			</section>
		</div>

	)
}

export default Movies
