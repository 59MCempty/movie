import React, {useEffect, useState} from 'react'
import {URLIMG, apiGetMovies} from './utils/api.js'
import {BsFillPlayFill,} from "react-icons/bs"
import {AiOutlineExclamationCircle} from "react-icons/ai"
import RowComponents from './RowComponents.jsx'
import axios from "axios";
import Spinner from "./Spinner.jsx";
import {Link} from "react-router-dom";

const Movies = () => {
	const [movieCategories, setMovieCategories] = useState({
		popular: null,
		top_rated: null,
		upcoming: null,
	})
	const [loading, setLoading] = useState(false);
	const params = ["popular", "top_rated", "upcoming"]

	const dataMovies = async () => {
		setLoading(true)
		try {
			const request = params.map(async param => {
				const res = await apiGetMovies(param)
				// check
				const obj = {}
				obj[param] = res
				return obj
			})
			const response = await axios.all(request)

			if (response && response.length > 0) {
				await response.forEach((item) => {
					if (Object.keys(item)[0] === "popular" && Object.values(item)[0].length > 0) {
						console.log(Object.values(item)[0])
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
			<Spinner loading={loading} list={popular}/>
			<img
				className="bannerImg"
				src={`${URLIMG}original/${movie?.backdrop_path || movie?.poster_path}`}
				alt="background"/>
			<div className="shadowBanner"></div>

			<div className="text-white w-full flex flex-col absolute top-[30%] pl-20">
				<div className="flex items-center gap-x-5">
					<button
						className="buttonBanner hover:bg-black hover:border-black bg-gray-900 border-gray-800">
						<BsFillPlayFill size={40}/> <span>Play</span></button>
					<button
						className="buttonBanner hover:bg-gray-300 border-gray-50">
						<AiOutlineExclamationCircle size={40}/>
						<Link to={`/movie/${movie?.id}`} state={{movie: movie, media_type: "movie"}}
						>Details</Link></button>
				</div>
				<div className="flex flex-col gap-y-2">
					<h1 className="text-3xl">{movie?.title || movie?.original_title}</h1>
					<h1 className="text-gray-400">Release Date: {movie?.release_date}</h1>
					<h1 className="w-[50%] text-lg">{movie?.overview}</h1>
				</div>
			</div>
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
