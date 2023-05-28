import React, {useState} from 'react';
import {apiSearch} from "./utils/api.js";
import DisplayCredits from "./DisplayCredits.jsx";
import detailsApi from "./utils/modules/mediaDetails.api.js";


const SearchPage = () => {
	const [keyword, setKeyword] = useState()
	const [listSearch, setListSearch] = useState([])
	const [media_type, setMedia_type] = useState("movie");


	const [isClick, setIsClick] = useState(false)
	const [loading, setLoading] = useState(false)
	const getSearchData = async (media_type, keyword) => {
		setLoading(true)
		try {
			const response = await detailsApi.search(media_type, keyword)

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


	const userInput = (e) => {
		setKeyword(e.target.value)
		if (keyword) {
			getSearchData(media_type, keyword)
		}
	}

	const loadingPage = () => {
		if (loading && listSearch.length > 0) {
			return (
				<div className="flex items-center justify-center h-[300px] bg-transparent">
					<svg
						className={`animate-spin w-16 h-16 text-white`}
						xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
						<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
								strokeWidth="4"></circle>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
					</svg>
				</div>
			)
		}
		if (!loading && !listSearch) {
			return (
				<div className="text-white text-3xl w-full h-32 border">
					Please Search
				</div>
			)
		}
	}

	return (
		<div className="px-[16rem] py-20 h-full w-full">
			{loadingPage()}
			<div>
				<input
					placeholder="please type something ...."
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
				{listSearch && <DisplayCredits list={listSearch} media={media_type}/>}
			</div>
		</div>
	);
};


export default SearchPage;
