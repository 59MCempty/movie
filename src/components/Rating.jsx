import React from 'react';
import {BsStar as StarEmpty, BsStarHalf, BsStarFill} from "react-icons/bs"

const Rating = ({rating}) => {
	rating = (parseFloat(rating * 5 /10).toFixed(2))

	const starList = []
	const starfillCount = Math.floor(rating) // lay phan nguyen -- 2
	const hasHalfStar = rating - parseInt(rating) >= 0.5 // phan thap phan >= 0.5 true oposite false
	const emptyStarCount = 5 - starfillCount - (hasHalfStar ? 1 : 0) // 5 - 2 - 0

	for (let i = 0; i < starfillCount; i++) {
		starList.push(<BsStarFill/>)
	}
	if (hasHalfStar) {
		starList.push(<BsStarHalf/>)
	}
	for (let i = 0; i < emptyStarCount; i++) {
		starList.push(<StarEmpty/>)
	}

	return (
		<div className="flex gap-2 text-2xl">
			<h4 className="flex text-yellow-400/70">{starList}</h4>
			<h4 className="relative bottom-1">{rating}/5</h4>
		</div>
	);
};

export default Rating;
