import React, {useEffect, useState} from 'react';
import urlConfigs from "./utils/modules/url.js";
import detailsApi from "./utils/modules/mediaDetails.api.js";

const VideoIntroduce = ({movie, media}) => {
	const [trailers, setTrailers] = useState([]);
	const videoDatas = async (mediaType, mediaId, category) => {
		const response = await detailsApi.getMediaList(mediaType, mediaId, category)
		if (response?.results && trailers.includes(urlConfigs.youtubePath(response?.results[0]?.key)) === false) {
			// setTrailers(YOUTUBE_LINK + response?.results[0]?.key + "?rel=0")
			setTrailers(urlConfigs.youtubePath(response?.results[0]?.key))
		}
	}


	useEffect(() => {
		videoDatas(media, movie?.id, "videos")
	}, [])

	return (

		<div className="h-full w-full flex gap-y-3 flex-col items-center justify-center">
			<h1 className="text-5xl uppercase text-white border-b-4 pb-1 border-red-600 font-medium">trailer</h1>
			<div
				className="relative w-[1024px] h-full max-w-5xl shadow-xl flex items-center overflow-x-scroll overflow-y-hidden whitespace-nowrap scrollbar-hide">
				<div className="w-full h-full">
					{/*{*/}
					{/*	trailers?.map((movie, index) =>*/}
					{/*		<div key={index} className='relative w-full h-full inline-block mr-4'>*/}
					{/*			<iframe className="w-full h-full aspect-video" src={movie}></iframe>*/}
					{/*		</div>*/}
					{/*	)*/}
					{/*}*/}
					<div className='relative w-full h-full inline-block mr-4'>
						<iframe className="w-full h-full aspect-video" src={trailers}></iframe>
					</div>
				</div>
			</div>

		</div>

	);
};

export default VideoIntroduce;
