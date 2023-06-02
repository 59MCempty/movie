import {URLIMG} from "./utils/api.js";
import {Link} from "react-router-dom";
import {MdPlayArrow} from "react-icons/md"

const DisplayCredits = ({list}) => {
	return (
		<div className="grid grid-cols-4 w-full top-0 lg:gap-x-8 xl:gap-x-3 gap-y-3 pb-10">
			{
				list?.map(item =>
					<div
						key={item?.id}
						className="lg:h-[450px] lg:w-[220px] xl:h-[550px] xl:w-[350px] relative">
						<img
							className="w-full h-full block object-cover"
							src={`${URLIMG}original${item?.backdrop_path || item?.poster_path}`}
							alt={item?.title}/>
						<div
							className="h-full text-white grid place-items-center transition-all ease-out duration-150 delay-150 cursor-pointer text-xl w-full absolute bottom-0 hover:bg-black/80 opacity-0 hover:opacity-100">
							<div className="flex flex-col items-center gap-y-3 justify-center">
								<Link
									to={`/movie/${item?.id}`}
									state={{movie: item, media_type: "movie"}}
									className="border border-red-500 rounded-xl shadow-lg shadow-red-600 bg-red-600/90 w-28 flex items-center justify-center ">
									<MdPlayArrow size={40}/>
								</Link>
								<h1 className="w-full px-3 flex justify-center items-center">
									{item?.title || item?.name}
								</h1>
							</div>

						</div>
					</div>
				)
			}
		</div>

	);
};

export default DisplayCredits;
