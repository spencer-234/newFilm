// fetch data from tmdb api for initial homepage render.
// request is in api instead on client to keep api key hidden.
import { Movie, HomeMedia } from "@/typings"
import { NextResponse } from "next/server"
import { baseUrl } from "@/utils/urlConstants"

export const GET = async () => {
    const homeRequests = {
        fetchTrending: `${baseUrl}/trending/movie/day?api_key=${process.env.API_KEY}&language=en-US`,
        fetchTopRated: `${baseUrl}/movie/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=1`,
        fetchTopRatedTv: `${baseUrl}/discover/tv?api_key=${process.env.API_KEY}&include_adult=false&language=en-US&page=1&sort_by=vote_average.desc&vote_count.gte=200`,
    };

    try {

        const [trending, topRated, topRatedTv]: Array<Movie[]> = await Promise.all([
            fetch(homeRequests.fetchTrending).then((res) => res.json()).then((data) => data.results),
            fetch(homeRequests.fetchTopRated).then((res) => res.json()).then((data) => data.results),
            fetch(homeRequests.fetchTopRatedTv).then((res) => res.json()).then((data) => data.results),
        ])

        const data: HomeMedia = {
            trending: trending.filter(movie => movie.backdrop_path && movie.poster_path),
            topRated: topRated.filter(movie => movie.backdrop_path && movie.poster_path),
            topRatedTv: topRatedTv.filter(movie => movie.backdrop_path && movie.poster_path),
        }

        return NextResponse.json({ data: data }, { status: 200 });

    } catch (err) {
        return NextResponse.json({ message: "Failed to fetch posts" }, { status: 500 });
    }
}