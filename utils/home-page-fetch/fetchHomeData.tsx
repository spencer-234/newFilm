import { homeRequests } from "./homeRequests"
import { Movie } from "@/typings";

// get homepage movies from api
export const fetchHomeData = async () => {
    const [trending, popular, topRated, upcoming]: Array<Movie[]> = await Promise.all([
        fetch(homeRequests.fetchTrending, { cache: 'no-store' }).then((res) => res.json()).then((data) => data.results),
        fetch(homeRequests.fetchPopular, { cache: 'no-store' }).then((res) => res.json()).then((data) => data.results),
        fetch(homeRequests.fetchTopRated, { cache: 'no-store' }).then((res) => res.json()).then((data) => data.results),
        fetch(homeRequests.fetchUpcoming, { cache: 'no-store' }).then((res) => res.json()).then((data) => data.results),
    ]).catch(err => {
        throw new Error('Failed to get movie data.')
    })

    return {
        trending: trending,
        popular: popular,
        topRated: topRated,
        upcoming: upcoming
    }
};