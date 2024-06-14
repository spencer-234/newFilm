import { NextRequest, NextResponse } from "next/server"
import { Movie } from "@/typings";

export const GET = async (request: NextRequest) => {
    // get query from url
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');

    // function to filter titles of out fetched array in case of no titles and return 5 titles
    const getTitles = (media: Movie[], type: string) => {
        const titles: string[] = [];
        if (media) {
            let property: string = (type === 'movies') ? 'title' : 'name';
            const mediaWithTitles: Movie[] = media.filter((movie) => Object.hasOwn(movie, property));
            for (let i = 0; i < ((media.length > 5) ? 5 : media.length); i++) {
                (property === 'name')
                    ? titles.push(mediaWithTitles[i].name)
                    : titles.push(mediaWithTitles[i].title)
            }
        }
        return titles;
    };

    // fetch tmbd api based on query
    try {

        if (!query) {
            return NextResponse.json({ data: [] }, { status: 200 });
        }

        const [movies, tvShows]: Array<string[]> = await Promise.all([
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${query}&include_adult=false&language=en-US&page=1`)
                .then(res => res.json())
                .then((data) => getTitles(data.results, 'movies')),
            fetch(`https://api.themoviedb.org/3/search/tv?api_key=${process.env.API_KEY}&query=${query}&include_adult=false&language=en-US&page=1`)
                .then(res => res.json())
                .then((data) => getTitles(data.results, 'shows')),
        ])

        // sort list of movies and tvShows alphabetically
        const media = [...movies, ...tvShows];

        return NextResponse.json({ data: media }, { status: 200 });

    } catch (err) {
        return NextResponse.json({ message: "Failed to fetch search results" }, { status: 500 });
    }


}