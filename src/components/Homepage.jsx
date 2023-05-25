import React, {useEffect, useState} from 'react'
import {FetchGetapi, URLIMG} from './utils/api.js'
import {BsFillPlayFill,} from "react-icons/bs"
import {AiOutlineExclamationCircle} from "react-icons/ai"
import RowTrending from "./RowTrending.jsx";
import Spinner from "./Spinner.jsx";
import {Link} from "react-router-dom";


const Homepage = () => {
	const [listTrending, setListTrending] = useState([])
	const [loading, setLoading] = useState(false);
	const trending = listTrending[Math.floor(Math.random() * listTrending.length)]

	const dataTrending = async (type) => {
		setLoading(true)
		try {
			const response = await FetchGetapi(type)
			if (response?.length > 0) {
				setListTrending(response)
			}
		} finally {
			setLoading(false)
		}
		return loading
	}

	const loadingState = () => {
		return (
			<div className="background relative">
				<Spinner loading={loading} list={listTrending}/>
				<img
					className="bannerImg"
					src={`${URLIMG}original/${trending?.backdrop_path || trending?.poster_path}`}
					alt="banner"/>
				<div className="shadowBanner"></div>
				<div className="text-white w-full flex flex-col absolute top-[30%] pl-20">
					<div className="flex items-center gap-x-5">
						<button
							className="buttonBanner hover:bg-black hover:border-black bg-gray-900 border-gray-800">
							<BsFillPlayFill size={40}/> <span>Play</span></button>
						<button
							className="buttonBanner hover:bg-gray-300 border-gray-50">
							<AiOutlineExclamationCircle size={40}/>
							{trending?.media_type === "movie" ?
								<Link to={`/movie/${trending?.id}`} state={{
									movie: trending,
									media_type: trending?.media_type
								}}>Details</Link> :
								<Link to={`/tv/${trending?.id}`} state={{
									movie: trending,
									media_type: trending?.media_type
								}}>Details</Link>}
						</button>
					</div>
					<div className="flex flex-col gap-y-2">
						<h1 className="text-3xl">{trending?.title || trending?.original_title || trending?.name || trending?.original_name}</h1>
						<h1 className="text-gray-400">Release
							Date: {trending?.release_date || trending?.first_air_date}</h1>
						<h1 className="w-[50%] text-lg">{trending?.overview}</h1>
					</div>
				</div>
				<section className="m-5 absolute top-[70%]">
					<RowTrending idx='1' title="all"/>
					<RowTrending idx='2' title="movie"/>
					<RowTrending idx='3' title="tv"/>
				</section>
			</div>
		)
	}

	useEffect(() => {
		dataTrending('all')
	}, [])

	return (
		<div>
			{loadingState()}
		</div>
	)
}

export default Homepage
