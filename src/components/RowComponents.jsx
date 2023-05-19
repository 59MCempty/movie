import React, { useEffect, useState } from 'react'
import {apiGetMovies } from './utils/api.js'
import {BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill} from "react-icons/bs"
import Card from './card.jsx'
import { NavLink } from 'react-router-dom'

const RowComponents = ({title, idx}) => {
    const [moviesList, setMovieList] = useState([])
    const getMoviesFromApi = async (param) => {
        const response =  await apiGetMovies(param)
        setMovieList(response)
    }
    useEffect(() => {
        getMoviesFromApi(title)
    }, [])

    const moveLeft = () => {
        let move = document.getElementById("slide" + idx)
        move.scrollLeft -= 500
    }
    const moveRight = () => {
        let move = document.getElementById("slide" + idx)
        move.scrollLeft += 500

    }
    return (
        <div className="my-5 mx-3">
            <NavLink to={`/${title}`} state={{ myData: moviesList }} className="text-white w-[16%] my-10 capitalize pl-3 py-5 ml-3 rounded-lg bg-red-600 shadow-xl shadow-red-700 border-red-700 text-4xl grid place-items-center border-2 border">
                {title}
            </NavLink>
            <div className="pl-4 flex items-center mt-3 pl-3 relative group">
                <BsFillArrowLeftCircleFill onClick={moveLeft} className="text-gray-200 z-[100] ml-2 absolute left-0 cursor-pointer opacity-0 group-hover:opacity-100 transition ease-in duration-300" size={40} />
                <div id={'slide' + idx} className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide">
                    {moviesList?.map(item =>
                        <div key={item?.id} className="inline-block mr-3 space-x-3 ">
                            <Card item={item} />
                        </div>
                    )}
                </div>
                <BsFillArrowRightCircleFill onClick={moveRight} className="text-gray-200 z-[100] mr-2 absolute right-0 cursor-pointer opacity-0 group-hover:opacity-100 transition ease-in duration-300r" size={40} />
            </div>
        </div>
    )
}

export default RowComponents
