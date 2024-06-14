import requests from "./requests"

export const fetchMedia = async () => {
    const [
        netflixOriginals,
        trendingNow,
        topRated,
        actionMovies,
        comedyMovies,
        horrorMovies,
        romanceMovies,
        documentaries,
    ] = await Promise.all([
        fetch(requests.fetchNetflixOriginals, { cache: 'no-store' }).then((res) => res.json()),
        fetch(requests.fetchTrending, { cache: "no-store" }).then((res) => res.json()),
        fetch(requests.fetchTopRated, { cache: "no-store" }).then((res) => res.json()),
        fetch(requests.fetchActionMovies, { cache: "no-store" }).then((res) => res.json()),
        fetch(requests.fetchComedyMovies, { cache: "no-store" }).then((res) => res.json()),
        fetch(requests.fetchHorrorMovies, { cache: "no-store" }).then((res) => res.json()),
        fetch(requests.fetchRomanceMovies, { cache: "no-store" }).then((res) => res.json()),
        fetch(requests.fetchDocumentaries, { cache: "no-store" }).then((res) => res.json()),
    ])

    return {
        netflixOriginals: netflixOriginals.results,
        trendingNow: trendingNow.results,
        topRated: topRated.results,
        actionMovies: actionMovies.results,
        comedyMovies: comedyMovies.results,
        horrorMovies: horrorMovies.results,
        romanceMovies: romanceMovies.results,
        documentaries: documentaries.results,
    }
}