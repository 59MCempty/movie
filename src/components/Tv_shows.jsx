import React, {useEffect, useState} from 'react';
import mediaApi from "./utils/modules/media.api.js";
import axios from "axios";
import RowComponents from "./RowComponents.jsx";
import Spinner from "./Spinner.jsx";
import BannerDetails from "./BannerDetails.jsx";
import urlConfigs from "./utils/modules/url.js";

const Tv_shows = () => {
	const [tvshowsCategories, setTvshowsCategories] = useState({
		airing_today: null,
		popular: null,
		top_rated: null,
		on_the_air: null,
	});
	const [loading, setLoading] = useState(false);
	const params = Object.values(urlConfigs.mediaCategoryOfTVSeries)


	const getDataSeries = async () => {
		setLoading(true)
		try {
			const request = params.map(async param => {
				const res = await mediaApi.getSeriesType(param)
				// check
				const obj = {}
				obj[param] = res?.results
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
			{airingToday && <Spinner loading={loading} list={airingToday}/>}
			<BannerDetails media={{media_type: media_type, media: tv}}/>
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
