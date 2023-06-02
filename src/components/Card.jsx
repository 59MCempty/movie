import React, {useState} from 'react'
import {URLIMG} from './utils/api.js'
import {AiFillPlayCircle} from 'react-icons/ai'
import {Link} from "react-router-dom"
import urlConfigs from "./utils/modules/url.js";

const Card = ({item, media}) => {
	const [displayPlayBtn, setDisplayPlayBtn] = useState(false)
	const mouveOver = () => {
		setDisplayPlayBtn(true)
	}
	const mouveOut = () => {
		setDisplayPlayBtn(false)
	}

	const title = (name, number) => {
		if (name?.length > number) {
			name = name.slice(0, number)
			return name
		} else {
			return name
		}
	}


	return (<div
		onMouseOut={mouveOut}
		onMouseOver={mouveOver}
		className="relative hover:z-[100]">
		<img
			src={media === 'tv' ? `${urlConfigs.posterPath(item?.poster_path)}` : `${urlConfigs.backdropPath(item?.backdrop_path)}`}
			className="h-[300px] w-[380px] object-cover" alt={item?.name}
		/>

		<div
			className="absolute transition delay-300 duration-300 top-0 flex items-center flex-col justify-center w-full h-full bg-black/80 opacity-0 hover:opacity-100">
			<Link to={`/${media}/${item?.id}`}
				  state={{movie: item, media_type: media}}>
				<button className="text-red-600">
					<AiFillPlayCircle size={50}/></button>
			</Link>
			<h1 className="text-white text-lg px-10">{title(item?.title || item?.name, 20)}</h1>
		</div>

	</div>)
}

export default Card
