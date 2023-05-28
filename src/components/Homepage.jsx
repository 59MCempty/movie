import React, {useEffect, useState} from 'react'
import trendingApi from "./utils/modules/trending.api.js";
import RowTrending from "./RowTrending.jsx";
import Spinner from "./Spinner.jsx";

import BannerDetails from "./BannerDetails.jsx";


const Homepage = () => {
	const [listTrending, setListTrending] = useState([])
	const [loading, setLoading] = useState(false);
	const trending = listTrending[Math.floor(Math.random() * listTrending.length)]

	const getData = async (mediaType) => {
		setLoading(true)
		try {
			const response = await trendingApi.getTrending(mediaType)
			if (response) {
				setListTrending(response)
			}
		} catch (err) {
			console.log(err)
		}
		finally {
			setLoading(false)
		}
	}

	const loadingState = () => {
		return (
			<div className="background relative">
				<Spinner loading={loading} list={listTrending}/>
				<BannerDetails media={trending} />
				<section className="m-5 absolute top-[70%]">
					<RowTrending idx='1' title="all"/>
					<RowTrending idx='2' title="movie"/>
					<RowTrending idx='3' title="tv"/>
				</section>
			</div>
		)
	}

	useEffect(() => {
		getData('all')
	}, [])

	return (
		<div>
			{loadingState()}
		</div>
	)
}

export default Homepage
