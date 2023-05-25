import React, {useState} from 'react'
import {URLIMG} from './utils/api.js'
import {AiFillPlayCircle} from 'react-icons/ai'
import {Link} from "react-router-dom"

const Card = ({item, media}) => {

	const [displayPlayBtn, setDisplayPlayBtn] = useState(false)
	const mouveOver = () => {
		setDisplayPlayBtn(true)
	}
	const mouveOut = () => {
		setDisplayPlayBtn(false)
	}

	const title = (name, number) => {
		if (name > number) {
			name.slice(0, number)
			return name
		} else {
			return name
		}
	}
	return (<Link to={`/${media}/${item?.id}`} state={{movie: item, media_type: media}}
				  onMouseOut={mouveOut}
				  onMouseOver={mouveOver}
				  className={`relative hover:scale-110 hover:z-[100]`}>
			<img src={`${URLIMG}w300/${item?.backdrop_path}`} alt={item?.name}
			/>
			<h1 className={`absolute px-2 bottom-0 left-0 w-full bg-gradient-to-r from-gray-500 ${displayPlayBtn ? "block" : "hidden"}`}>{title(item?.title || item?.name, 20)}</h1>
			<button className={`absolute top-2 left-2 mt-1 text-red-500 ${displayPlayBtn ? "block" : "hidden"}`}>
				<AiFillPlayCircle size={30}/></button>
		</Link>)
}

export default Card
