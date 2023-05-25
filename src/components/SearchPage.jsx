import React, {useState} from 'react';
import {apiSearch} from "./utils/api.js";
import DisplaySearchList from "./DisplaySearchList.jsx";
import Spinner from "./Spinner.jsx";


const SearchPage = () => {
	const [keyword, setKeyword] = useState()
	const [listSearch, setListSearch] = useState([])
	const [media_type, setMedia_type] = useState("movie");


	const [isClick, setIsClick] = useState(false)
	const [loading, setLoading] = useState(false)
	const getSearchData = async (media_type, keyword) => {
		setLoading(true)
		try {
			const response = await apiSearch(media_type, keyword)
			setListSearch(response)
		} finally {
			setLoading(false)
		}
	}


	const getValueName = async (e) => {
		setIsClick(true)
		setMedia_type(e.target.childNodes[0].nodeValue)
		getSearchData(media_type, keyword)
	}

	console.log(loading)
	const userInput = (e) => {
		setKeyword(e.target.value)
		if (keyword) {
			getSearchData(media_type, keyword)
		}
	}


	return (
		<div className="px-[16rem] py-20 h-full w-full">
			{listSearch && <Spinner loading={loading} list={listSearch}/>}
			<div>
				<input
					onChange={(e) => userInput(e)}
					type="text"
					className="border border-green-800 w-full h-14 px-2 bg-gray-900/40 my-4 text-gray-100 text-xl">
				</input>
				<div className="flex gap-x-5 w-full h-14 items-center justify-center">
					<button
						name="movie"
						onClick={e => getValueName(e)}
						className={`${isClick && media_type === "movie" ? "bg-red-600" : ""} uppercase w-32 h-full hover:bg-red-900 px-3 text-xl font-medium text-white border border-red-500 `}>movie
					</button>
					<button
						name="tv"
						onClick={e => getValueName(e)}
						className={`${isClick && media_type === "tv" ? "bg-red-600" : ""} uppercase w-32 h-full hover:bg-red-900 px-3 text-xl font-medium text-white border border-red-500 `}>tv
					</button>
				</div>
			</div>

			<div className="w-full h-full my-10">
				{listSearch && <DisplaySearchList list={listSearch} media={media_type}/>}
			</div>
		</div>
	);
};


export default SearchPage;
