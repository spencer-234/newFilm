import { NextRequest, NextResponse } from "next/server"
import { Movie } from "@/typings";
import { SearchResult } from "@/typings";

export const GET = async (request: NextRequest) => {
    // get query from url
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');

    // function to return id, title, poster, and release date of the first five movies from fetched data
    const getTitles = (media: Movie[], type: string) => {
        let filteredFive: SearchResult[] = [];

        if (media) {
            let property: string = (type === 'movie') ? 'title' : 'name';
            const mediaPropertyCheck: Movie[] = media.filter((movie) => Object.hasOwn(movie, property));
            const firstFive: Movie[] = mediaPropertyCheck.length > 4 ? mediaPropertyCheck.slice(0, 4) : mediaPropertyCheck;
            filteredFive = firstFive.map((movie) => ({
                id: movie.id,
                title: type === 'movie' ? movie.title : movie.name,
                poster_path: movie.poster_path,
                release_date: movie.release_date,
                type: type
            }))

        }
        return filteredFive;
    };

    // fetch tmbd api based on query
    try {

        if (!query) {
            return NextResponse.json({ data: [] }, { status: 200 });
        }

        const [movies, tvShows]: Array<SearchResult[]> = await Promise.all([
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${query}&include_adult=false&language=en-US&page=1`)
                .then(res => res.json())
                .then((data) => getTitles(data.results, 'movie')),
            fetch(`https://api.themoviedb.org/3/search/tv?api_key=${process.env.API_KEY}&query=${query}&include_adult=false&language=en-US&page=1`)
                .then(res => res.json())
                .then((data) => getTitles(data.results, 'tv')),
        ])

        // sort list of movies and tvShows alphabetically
        const media = [...movies, ...tvShows];

        return NextResponse.json({ data: media }, { status: 200 });

    } catch (err) {
        return NextResponse.json({ message: "Failed to fetch search results" }, { status: 500 });
    }


}