import React, {useEffect, useState} from 'react';
import urlConfigs from "./utils/modules/url.js";
import detailsApi from "./utils/modules/mediaDetails.api.js";

const PosterMoive = ({movie, media}) => {
	const [posterList, setPosterList] = useState([]);
	const getBackdrop = async (mediaType, mediaId, category) => {
		const response = await detailsApi.getMediaList(mediaType, mediaId, category)
		if (response) {
			setPosterList(response?.posters.slice(0, 5))
		}
	}

	useEffect(() => {
		getBackdrop(media, movie?.id, "images")
	}, [])

	return (
		<div className="flex flex-col gap-y-3 items-center justify-center horizontall_bar">
			<h1 className="text-5xl uppercase text-white border-b-4 pb-1 border-red-600 font-medium w-[12%]">Posters</h1>
			<div className="h-full max-w-full grid grid-cols-5 gap-x-5">
				{
					posterList.map((poster, index) =>
						<div className="block" key={index}>
							<img className="h-[443px] w-[332px] inline-block object-cover"
								 src={urlConfigs.posterPath(poster?.file_path)} alt="poster"/>
						</div>
					)
				}
			</div>
		</div>
	);
};

export default PosterMoive;
