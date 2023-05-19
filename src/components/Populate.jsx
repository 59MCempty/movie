import React from 'react'
import { useLocation } from 'react-router-dom'
import { URLIMG } from './utils/api.js'

const Populate = () => {
    const location = useLocation()
    const {myData} = location.state
    const movie = Math.floor(Math.random() * myData.length)
    console.log(myData[movie])
    return (
        <div className="h-screen w-full top-0 left-0">
            <div className="h-[850px] w-full relative">
                <img className='h-[650px] w-full' src={`${URLIMG}original/${myData[movie]?.backdrop_path}`} alt={myData[movie]?.title} />
                <div className="w-full h-[420px] absolute top-[50%] left-[20%] shadow-2xl flex space-x-5">
                    <div className="w-[250px] h-[380px] border-none outline-none ">
                        <img className="h-full w-full object-fill shadow-2xl rounded-2xl border-1 border-gray-900" src={`${URLIMG}w500/${myData[movie]?.backdrop_path}`} />
                    </div>
                    <div className="border w-[40%] h-[380px] rounded-2xl bg-black opacity-30">
                        <h1>{myData[movie]?.title}</h1>
                        <h1>{myData[movie]?.release_date}</h1>
                        <p>{myData[movie]?.overview}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Populate
