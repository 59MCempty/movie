import React, {useEffect, useState} from 'react';
import {apiGetMovies, apiGetTv_shows, URLIMG} from "./utils/api.js";
import axios from "axios";
import {BsFillPlayFill} from "react-icons/bs";
import {AiOutlineExclamationCircle} from "react-icons/ai";
import RowComponents from "./RowComponents.jsx";
import Spinner from "./Spinner.jsx";
import ratedStar from "./RatedStar.jsx";
import {Link} from "react-router-dom";

const Tv_shows = () => {
	const [tvshowsCategories, setTvshowsCategories] = useState({
		airing_today: null,
		popular: null,
		top_rated: null,
		on_the_air: null,
	});
	const params = ["airing_today", "popular", "top_rated", "on_the_air"]
	const [loading, setLoading] = useState(false);


	const getDataSeries = async () => {
		setLoading(true)
		try {
			const request = params.map(async param => {
				const res = await apiGetTv_shows(param)
				// check
				const obj = {}
				obj[param] = res
				return obj
			})

			const response = await axios.all(request)

			if (response && response.length > 0) {
				await response.forEach((item) => {
					if (Object.keys(item)[0] === "airing_today" && Object.values(item)[0].length > 0) {
						setTvshowsCategories(prevState => ({
							...prevState,
							airing_today: Object.values(item)[0]
						}))
					}
					if (Object.keys(item)[0] === "top_rated" && Object.values(item)[0].length > 0) {
						setTvshowsCategories(prevState => ({
							...prevState,
							top_rated: Object.values(item)[0]
						}))
					}
					if (Object.keys(item)[0] === "popular" && Object.values(item)[0].length > 0) {
						setTvshowsCategories(prevState => ({
							...prevState,
							popular: Object.values(item)[0]
						}))
					}
					if (Object.keys(item)[0] === "on_the_air" && Object.values(item)[0].length > 0) {
						setTvshowsCategories(prevState => ({
							...prevState,
							on_the_air: Object.values(item)[0]
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
		getDataSeries()
	}, [])

	const airingToday = tvshowsCategories?.airing_today
	const media_type = tvshowsCategories ? "tv" : ""
	const tv = airingToday ? airingToday[Math.floor(Math.random() * airingToday?.length)] : 0
	return (

		<div className="background relative">
			<Spinner loading={loading} list={airingToday}/>
			<img
				className="bannerImg"
				src={`${URLIMG}original/${tv?.backdrop_path || tv?.poster_path}`}
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
						<Link to={`/tv/${tv?.id}`} state={{movie: tv, media_type: "tv"}}
						>Details</Link></button>
				</div>

				<div className="flex flex-col gap-y-2">
					<h1 className="text-3xl">{tv?.name || tv?.original_name}</h1>
					<h1 className="text-gray-400">Release Date: {tv?.first_air_date}</h1>
					<h1 className="w-[50%] text-lg">{tv?.overview}</h1>
				</div>

			</div>
			<section className="m-5 absolute top-[70%] py-10">
				<RowComponents
					media={media_type}
					category={tvshowsCategories?.popular}
					idx="1"
					title="Popular Series"/>
				<RowComponents
					media={media_type}
					category={tvshowsCategories?.top_rated}
					idx="2"
					title="Top Rated Series"/>
				<RowComponents
					media={media_type}
					category={tvshowsCategories?.on_the_air}
					idx="3"
					title="Upcoming Series"/>
			</section>
		</div>
	)
};

export default Tv_shows;
