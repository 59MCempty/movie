const backdropPath = (imgEndpoint) => `https://image.tmdb.org/t/p/original${imgEndpoint}`;

const posterPath = (imgEndpoint) => `https://image.tmdb.org/t/p/w500${imgEndpoint}`;

const youtubePath = (videoId) => `https://www.youtube.com/embed/${videoId}?controls=0`;

const mediaType = {
	movie: "movie",
	tv: "tv"
}

const mediaCategoryOfMovie = {
	popular: "popular",
	top_rated: "top_rated",
	upcoming: "upcoming"

}
const mediaCategoryOfTVSeries = {
	popular: "popular",
	top_rated: "top_rated",
	airingToday: "airing_today",
	onTheAir: "on_the_air"

}
console.log(Object.values(mediaCategoryOfMovie))

const urlConfigs = {
	backdropPath,
	posterPath,
	youtubePath,
	mediaType,
	mediaCategoryOfTVSeries,
	mediaCategoryOfMovie
}

export default urlConfigs