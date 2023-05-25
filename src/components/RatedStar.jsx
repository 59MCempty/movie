import React from 'react';
import {MdStar, MdStarHalf, MdStarOutline as EmptyStar} from "react-icons/md"
const RatedStar = ({rated}) => {
	const starList = []
	const starFillcount = Math.floor(rated)
	const hasHaflStar = rated - parseInt(rated) >=0.5
	const emptyStarCount = 5 - starFillcount - (hasHaflStar ? 1 : 0)

	for (let i =0; i <starFillcount; i++) {
		starList.push(<MdStar />)
	}
	if(hasHaflStar) {
		starList.push(<MdStarHalf />)
	}
	for (let i =0; i < emptyStarCount; i++) {
		starList.push(<EmptyStar />)
	}

	return (
		<div className="flex gap-x-3 text-xl">
			<h4 className="flex">{starList}</h4>
			<h4 className="relative bottom-1">{rated} / 5</h4>
		</div>
	);
};

export default RatedStar;
