// fetch data from tmdb api for initial homepage render.
// request is in api instead on client to keep api key hidden.
import { Movie } from "@/typings"
import { NextResponse } from "next/server"
import { baseUrl } from "@/utils/urlConstants"


interface HomeData {
    trending: Movie[],
    topRated: Movie[],
    upcoming: Movie[]
}

export const GET = async () => {
    const homeRequests = {
        fetchTrending: `${baseUrl}/trending/movie/day?api_key=${process.env.API_KEY}&language=en-US`,
        fetchTopRated: `${baseUrl}/movie/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=1`,
        fetchUpcoming: `${baseUrl}/movie/upcoming?api_key=${process.env.API_KEY}&language=en-US&page=1`,
    };

    try {

        const [trending, topRated, upcoming]: Array<Movie[]> = await Promise.all([
            fetch(homeRequests.fetchTrending).then((res) => res.json()).then((data) => data.results),
            fetch(homeRequests.fetchTopRated).then((res) => res.json()).then((data) => data.results),
            fetch(homeRequests.fetchUpcoming).then((res) => res.json()).then((data) => data.results),
        ])

        const data: HomeData = {
            trending: trending,
            topRated: topRated,
            upcoming: upcoming,
        }

        return NextResponse.json({ data: data }, { status: 200 });

    } catch (err) {
        return NextResponse.json({ message: "Failed to fetch posts" }, { status: 500 });
    }
}