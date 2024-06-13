import { NextResponse, NextRequest } from "next/server";
import { baseUrl } from "@/utils/urlConstants";
import { MediaImageObject } from "@/typings";

export const POST = async (request: NextRequest) => {
    // get ids of movies 
    const ids: number[] = await request.json();

    try {

        // fetch all images associated with movie id from tmdb
        const movieImagesPromises = await Promise.all(ids.map((id) => fetch(`${baseUrl}/movie/${id}/images?api_key=${process.env.API_KEY}`)));
        const movieImagesResponse = await Promise.all(movieImagesPromises.map(p => p.json()));

        // filter out the logos that are in english
        const movieImages = movieImagesResponse.map((movie: MediaImageObject) => movie.logos.filter(logo => logo.iso_639_1 === 'en'));

        return NextResponse.json({ data: movieImages }, { status: 200 })

    } catch (err) {
        return NextResponse.json({ message: 'Failed to fetch images' }, { status: 500 })
    }
}