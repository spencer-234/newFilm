"use client"

import { MediaImageObject } from "@/typings";
import { imageUrl } from "@/utils/urlConstants";
import { useState, useEffect, useRef } from "react";
import { Movie } from "@/typings";
import BlurredImagePlaceHolder from "../BlurredImagePlaceHolder";
interface Props {
    media: Movie[]
}

const Trending = ({ media }: Props) => {

    const [currentMovie, setCurrentMovie] = useState<number>(0);
    const [movieImageData, setMovieImageData] = useState<MediaImageObject[] | null>(null);
    const slideRef = useRef<HTMLImageElement | null>(null);

    // fetch all images associated with movies
    useEffect(() => {
        const getTitleLogos = async () => {
            const movieIds = media.map(movie => movie.id);
            await fetch(`/api/get-media/title-logos`, { method: 'POST', cache: 'no-store', body: JSON.stringify(movieIds) })
                .then(res => res.json())
                .then(data => setMovieImageData([...data.data]));
        }

        getTitleLogos();
    }, [])

    return (
        <section className={`w-screen h-[500px] relative center-flex slide ${!movieImageData && 'animate-pulse'}`}>
            {movieImageData && (<>
                <h2 className="absolute left-0 top-24 font-bold tracking-wider text-lg bg-black bg-opacity-80 pl-4 pr-2 py-2 rounded-e-lg flag">Trending</h2>
                <BlurredImagePlaceHolder
                    src={`${imageUrl + movieImageData[8].backdrops[0].file_path}`}
                    tailwindCss="w-full h-full object-cover object-center lg:object-custom-top"
                    alt=""
                />
                <BlurredImagePlaceHolder
                    src={`${imageUrl + movieImageData[8].logos[0].file_path}`}
                    tailwindCss="w-[90%] h-[30%] absolute bottom-7 left-5 right-auto sm:w-[60%] lg:left-10 max-w-[700px] bg-black bg-opacity-50 rounded-lg py-1 px-6 lg:bg-transparent"
                    alt=""
                />
            </>)}
        </section>

    )
}

export default Trending