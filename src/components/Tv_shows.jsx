import React, {useEffect, useState} from 'react';
import mediaApi from "./utils/modules/media.api.js";
import axios from "axios";
import RowComponents from "./RowComponents.jsx";
import Spinner from "./Spinner.jsx";
import BannerDetails from "./BannerDetails.jsx";
import urlConfigs from "./utils/modules/url.js";
import {useDispatch, useSelector} from "react-redux";
import {getSeries} from "./redux/action.js";

const Tv_shows = () => {
	const dispatch = useDispatch();
	const series = useSelector((state) => state.tv)

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
			dispatch(getSeries(response))
		} catch (err) {
			console.log(err)
		} finally {
			setLoading(false)
		}
	}
	useEffect(() => {
		getDataSeries()
	}, [])

	const airingToday = series.series.length > 0 ? series.series[2].airing_today : null;
	const tv = airingToday ? airingToday[Math.floor(Math.random() * airingToday?.length)] : 0

	return (

		<div className="background relative">
			{airingToday && <Spinner loading={loading} list={airingToday}/>}
			<BannerDetails media={{media_type: series.mediaType, media: tv}}/>
			<section className="m-5 absolute top-[70%] py-10">
				{
					series.series.map((item, index) =>
						<RowComponents key={index} item={item} media={series.mediaType} index={index}/>
					)
				}
			</section>
		</div>
	)
};

export default Tv_shows;
