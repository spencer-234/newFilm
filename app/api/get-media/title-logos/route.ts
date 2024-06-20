import { NextResponse, NextRequest } from "next/server";
import { baseUrl } from "@/utils/urlConstants";
import { MediaImageObject } from "@/typings";

interface MovieFields {
    movieInfo: { id: number, language: string }[]
    type: string
}

export const POST = async (request: NextRequest) => {
    // get ids of movies and type of media 
    const req: MovieFields = await request.json();
    const movieInfo = req.movieInfo;
    const type: string = req.type;

    try {

        // fetch all images associated with movie id from tmdb
        const movieImagesPromises = await Promise.all(movieInfo.map((movie) => fetch(`${baseUrl}/${type}/${movie.id}/images?api_key=${process.env.API_KEY}&include_image_language=en,${movie.language}`)));
        const movieImagesResponse = await Promise.all(movieImagesPromises.map(p => p.json()));

        // filter out the logos that are in english
        const movieImages = movieImagesResponse.map((movie: MediaImageObject) => movie.logos);

        return NextResponse.json({ data: movieImages }, { status: 200 })

    } catch (err) {
        return NextResponse.json({ message: 'Failed to fetch images' }, { status: 500 })
    }
}