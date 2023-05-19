import React from 'react'
import { URLIMG } from './utils/api.js'
import { AiFillPlayCircle } from 'react-icons/ai'

const Card = ({item}) => {
    return (
        <div className="relative hover:scale-110 transition duration-150 delay-75 cursor-pointer ">
            <img src={`${URLIMG}w300/${item?.backdrop_path}`} alt={item?.title} />
            <h1 className="absolute px-2 bottom-0 left-0 w-full bg-gradient-to-r from-gray-500">{item?.title.length > 20 ? item?.title.slice(0, 20) : item?.title}</h1>
            <button className="absolute top-2 left-1 text-red-500"><AiFillPlayCircle size={30} /></button>
        </div>
    )
}

export default Card
