import React, { useEffect, useState } from 'react'
import { FetchGetapi, URLIMG } from './utils/api.js'
import {BsFillPlayFill, } from "react-icons/bs"
import {AiOutlineExclamationCircle} from "react-icons/ai"
import RowComponents from './RowComponents.jsx'
import Navbar from './Navbar.jsx'

const Homepage = () => {
    const [listTrending, setListTrending] = useState([])

    const getListTrending = async () => {
        const response = await FetchGetapi()
        setListTrending(response)
    }

    useEffect(() => {
        getListTrending()
    }, [])

    console.log(listTrending[0]?.backdrop_path)
    return (

            <div>
                <img className="w-full h-[650px] object-cover" src={`${URLIMG}original/${listTrending[0]?.backdrop_path}`} alt="background" />
                <div className="absolute left-0 top-0 h-[650px] w-full bg-gradient-to-r from-[#121212] opacity-70"></div>
                <div className="text-white w-full flex flex-col absolute top-[33%] pl-20">
                    <div className="flex items-center gap-x-5">
                        <button className="hover:opacity-100 transition ease-in-out delay-150 opacity-80 flex items-center justify-center py-1 gap-x-3 text-2xl border border-2 my-2 rounded-lg w-40 text-lg"> <BsFillPlayFill size={40}/> <span>Play</span></button>
                        <button className="bg-gray-200 hover:bg-gray-300 hover:opacity-100 transition ease-in-out delay-150 border-gray-500 flex items-center justify-center py-1 gap-x-3 text-2xl border border-2 my-2 rounded-lg w-40 text-lg opacity-80" > <AiOutlineExclamationCircle size={40}/> <span>Details</span></button>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <h1 className="text-3xl">{listTrending[0]?.title}</h1>
                        <h1 className="text-gray-400">Release Date: {listTrending[0]?.release_date}</h1>
                        <h1 className="w-[50%] text-lg">{listTrending[0]?.overview}</h1>
                    </div>
                </div>
                <RowComponents idx="1" title="popular" />
                <RowComponents idx="2" title="top_rated" />
                <RowComponents idx="3" title="upcoming" />
            </div>

    )
}

export default Homepage
